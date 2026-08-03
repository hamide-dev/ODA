import { FormEvent, useEffect, useState } from 'react';
import { formationsService } from '@/api/formations.service';
import { getErrorMessage } from '@/api/errorMessage';
import { Formation, CreateFormationPayload, FormationStatut } from '@/types/formation.types';
import { Table, Column } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/context/ToastContext';
import { useConfirm } from '@/hooks/useConfirm';

const emptyForm: CreateFormationPayload = { nom: '', description: '' };
const STATUTS: FormationStatut[] = ['BROUILLON', 'OUVERTE', 'EN_COURS', 'TERMINEE', 'ARCHIVEE'];

export default function FormationsPage() {
  const toast = useToast();
  const { confirm, confirmDialog } = useConfirm();
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CreateFormationPayload>(emptyForm);
  const [saving, setSaving] = useState(false);

  const refresh = async () => {
    setLoading(true);
    try {
      setFormations(await formationsService.getAll());
    } catch (err) {
      toast.error(getErrorMessage(err, 'Impossible de charger les formations.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (f: Formation) => {
    setEditingId(f.id);
    setForm({ nom: f.nom, description: f.description ?? '' });
    setModalOpen(true);
  };

  // Création/édition : uniquement nom + description, jamais de cohorteId.
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await formationsService.update(editingId, form);
        toast.success('Formation mise à jour.');
      } else {
        await formationsService.create(form);
        toast.success('Formation créée.');
      }
      setModalOpen(false);
      await refresh();
    } catch (err) {
      toast.error(getErrorMessage(err, "Impossible d'enregistrer la formation."));
    } finally {
      setSaving(false);
    }
  };

  const handleStatutChange = async (id: string, statut: FormationStatut) => {
    try {
      await formationsService.updateStatut(id, statut);
      toast.success('Statut mis à jour.');
      await refresh();
    } catch (err) {
      toast.error(getErrorMessage(err, 'Impossible de changer le statut.'));
    }
  };

  const handleDelete = async (id: string) => {
    const ok = await confirm({
      title: 'Supprimer la formation',
      message: 'Cette action est irréversible. Confirmer la suppression ?',
    });
    if (!ok) return;
    try {
      await formationsService.remove(id);
      toast.success('Formation supprimée.');
      await refresh();
    } catch (err) {
      toast.error(getErrorMessage(err, 'Suppression impossible.'));
    }
  };

  const columns: Column<Formation>[] = [
    { header: 'Nom', render: (f) => f.nom },
    { header: 'Description', render: (f) => f.description || '—' },
    {
      header: 'Statut',
      render: (f) => (
        <select
          value={f.statut}
          onChange={(e) => handleStatutChange(f.id, e.target.value as FormationStatut)}
          className="rounded-full border border-ink/15 bg-white px-2 py-1 text-xs font-semibold"
        >
          {STATUTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      ),
    },
    {
      header: 'Actions',
      render: (f) => (
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => openEdit(f)}>
            Modifier
          </Button>
          <Button variant="danger" onClick={() => handleDelete(f.id)}>
            Supprimer
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-ink/60">{formations.length} formation(s)</p>
        <Button onClick={openCreate}>+ Nouvelle formation</Button>
      </div>

      <Table columns={columns} data={formations} rowKey={(f) => f.id} loading={loading} />

      <Modal
        open={modalOpen}
        title={editingId ? 'Modifier la formation' : 'Nouvelle formation'}
        onClose={() => setModalOpen(false)}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input
            label="Nom"
            value={form.nom}
            onChange={(e) => setForm({ ...form, nom: e.target.value })}
            required
          />
          <Input
            label="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <Button type="submit" loading={saving} className="mt-2">
            {editingId ? 'Enregistrer' : 'Créer'}
          </Button>
        </form>
      </Modal>

      {confirmDialog}
    </div>
  );
}
