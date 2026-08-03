import { FormEvent, useEffect, useState } from 'react';
import { usersService } from '@/api/users.service';
import { formationsService } from '@/api/formations.service';
import { cohortesService } from '@/api/cohortes.service';
import { getErrorMessage } from '@/api/errorMessage';
import { AppUser, RegisterPayload, Sexe } from '@/types/user.types';
import { Formation } from '@/types/formation.types';
import { Cohorte } from '@/types/cohorte.types';
import { Table, Column } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useToast } from '@/context/ToastContext';
import { useConfirm } from '@/hooks/useConfirm';

const emptyForm: RegisterPayload = {
  nom: '',
  prenom: '',
  email: '',
  password: '',
  age: 18,
  numero: '',
  sexe: 'M',
};

export default function ApprenantsPage() {
  const toast = useToast();
  const { confirm, confirmDialog } = useConfirm();
  const [apprenants, setApprenants] = useState<AppUser[]>([]);
  const [formations, setFormations] = useState<Formation[]>([]);
  const [cohortes, setCohortes] = useState<Cohorte[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<RegisterPayload>(emptyForm);
  const [saving, setSaving] = useState(false);

  const refresh = async (term = search) => {
    setLoading(true);
    try {
      const [a, f, c] = await Promise.all([
        usersService.getAll(term || undefined),
        formationsService.getAll(),
        cohortesService.getAll(),
      ]);
      setApprenants(a);
      setFormations(f);
      setCohortes(c);
    } catch (err) {
      toast.error(getErrorMessage(err, 'Impossible de charger les apprenants.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    refresh(search);
  };

  const handleCreateSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await usersService.create(form);
      toast.success('Apprenant inscrit.');
      setModalOpen(false);
      setForm(emptyForm);
      await refresh();
    } catch (err) {
      toast.error(getErrorMessage(err, "Impossible d'inscrire l'apprenant."));
    } finally {
      setSaving(false);
    }
  };

  const handleFormationChange = async (id: string, formationId: string) => {
    try {
      await usersService.update(id, { formationId });
      toast.success('Formation mise à jour.');
      await refresh();
    } catch (err) {
      toast.error(getErrorMessage(err, 'Mise à jour impossible.'));
    }
  };

  const handleCohorteChange = async (id: string, cohorteId: string) => {
    try {
      await usersService.update(id, { cohorteId });
      toast.success('Cohorte mise à jour.');
      await refresh();
    } catch (err) {
      toast.error(getErrorMessage(err, 'Mise à jour impossible.'));
    }
  };

  const handleDelete = async (id: string) => {
    const ok = await confirm({
      title: "Supprimer l'apprenant",
      message: 'Cette action est irréversible. Confirmer la suppression ?',
    });
    if (!ok) return;
    try {
      await usersService.remove(id);
      toast.success('Apprenant supprimé.');
      await refresh();
    } catch (err) {
      toast.error(getErrorMessage(err, 'Suppression impossible.'));
    }
  };

  const columns: Column<AppUser>[] = [
    { header: 'Nom', render: (a) => `${a.nom} ${a.prenom}` },
    { header: 'Email', render: (a) => a.email },
    {
      header: 'Formation',
      render: (a) => (
        <select
          value={a.formation?.id ?? ''}
          onChange={(e) => handleFormationChange(a.id, e.target.value)}
          className="rounded-lg border border-ink/15 bg-white px-2 py-1 text-xs"
        >
          <option value="">—</option>
          {formations.map((f) => (
            <option key={f.id} value={f.id}>
              {f.nom}
            </option>
          ))}
        </select>
      ),
    },
    {
      header: 'Cohorte',
      render: (a) => (
        <select
          onChange={(e) => handleCohorteChange(a.id, e.target.value)}
          defaultValue=""
          className="rounded-lg border border-ink/15 bg-white px-2 py-1 text-xs"
        >
          <option value="" disabled>
            Assigner...
          </option>
          {cohortes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nom}
            </option>
          ))}
        </select>
      ),
    },
    {
      header: 'Actions',
      render: (a) => (
        <Button variant="danger" onClick={() => handleDelete(a.id)}>
          Supprimer
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <Input
            placeholder="Rechercher un apprenant..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64"
          />
          <Button type="submit" variant="secondary">
            Rechercher
          </Button>
        </form>
        <Button onClick={() => setModalOpen(true)}>+ Inscrire un apprenant</Button>
      </div>

      <Table columns={columns} data={apprenants} rowKey={(a) => a.id} loading={loading} />

      <Modal open={modalOpen} title="Inscrire un apprenant" onClose={() => setModalOpen(false)}>
        <form onSubmit={handleCreateSubmit} className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Nom"
              value={form.nom}
              onChange={(e) => setForm({ ...form, nom: e.target.value })}
              required
            />
            <Input
              label="Prénom"
              value={form.prenom}
              onChange={(e) => setForm({ ...form, prenom: e.target.value })}
              required
            />
          </div>
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <Input
            label="Mot de passe"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <div className="grid grid-cols-3 gap-3">
            <Input
              label="Âge"
              type="number"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: Number(e.target.value) })}
              required
            />
            <div className="col-span-2">
              <Input
                label="Téléphone"
                value={form.numero}
                onChange={(e) => setForm({ ...form, numero: e.target.value })}
                required
              />
            </div>
          </div>
          <Select
            label="Sexe"
            value={form.sexe}
            onChange={(e) => setForm({ ...form, sexe: e.target.value as Sexe })}
          >
            <option value="M">Masculin</option>
            <option value="F">Féminin</option>
          </Select>
          <Button type="submit" loading={saving} className="mt-2">
            Inscrire
          </Button>
        </form>
      </Modal>

      {confirmDialog}
    </div>
  );
}
