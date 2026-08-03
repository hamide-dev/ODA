import { FormEvent, useEffect, useState } from 'react';
import { cohortesService } from '@/api/cohortes.service';
import { formationsService } from '@/api/formations.service';
import { getErrorMessage } from '@/api/errorMessage';
import { Cohorte } from '@/types/cohorte.types';
import { Formation } from '@/types/formation.types';
import { Table, Column } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Select } from '@/components/ui/Select';
import { useToast } from '@/context/ToastContext';
import { useConfirm } from '@/hooks/useConfirm';

export default function CohortesPage() {
  const toast = useToast();
  const { confirm, confirmDialog } = useConfirm();
  const [cohortes, setCohortes] = useState<Cohorte[]>([]);
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [formationId, setFormationId] = useState('');
  const [saving, setSaving] = useState(false);

  const refresh = async () => {
    setLoading(true);
    try {
      const [c, f] = await Promise.all([cohortesService.getAll(), formationsService.getAll()]);
      setCohortes(c);
      setFormations(f);
    } catch (err) {
      toast.error(getErrorMessage(err, 'Impossible de charger les cohortes.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formationId) return;
    setSaving(true);
    try {
      // Le back-end attend { formationId } uniquement — pas de "nom" libre.
      await cohortesService.create({ formationId });
      toast.success('Cohorte créée.');
      setModalOpen(false);
      setFormationId('');
      await refresh();
    } catch (err) {
      toast.error(getErrorMessage(err, 'Impossible de créer la cohorte.'));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    const ok = await confirm({
      title: 'Supprimer la cohorte',
      message: 'Cette action est irréversible. Confirmer la suppression ?',
    });
    if (!ok) return;
    try {
      await cohortesService.remove(id);
      toast.success('Cohorte supprimée.');
      await refresh();
    } catch (err) {
      toast.error(getErrorMessage(err, 'Suppression impossible.'));
    }
  };

  const columns: Column<Cohorte>[] = [
    { header: 'Nom', render: (c) => c.nom ?? '—' },
    { header: 'Formation', render: (c) => c.formation?.nom ?? '—' },
    {
      header: 'Actions',
      render: (c) => (
        <Button variant="danger" onClick={() => handleDelete(c.id)}>
          Supprimer
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-ink/60">{cohortes.length} cohorte(s)</p>
        <Button onClick={() => setModalOpen(true)}>+ Nouvelle cohorte</Button>
      </div>

      <Table columns={columns} data={cohortes} rowKey={(c) => c.id} loading={loading} />

      <Modal open={modalOpen} title="Nouvelle cohorte" onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Select
            label="Formation"
            value={formationId}
            onChange={(e) => setFormationId(e.target.value)}
            required
          >
            <option value="">Sélectionner une formation</option>
            {formations.map((f) => (
              <option key={f.id} value={f.id}>
                {f.nom}
              </option>
            ))}
          </Select>
          <Button type="submit" loading={saving} disabled={!formationId} className="mt-2">
            Créer
          </Button>
        </form>
      </Modal>

      {confirmDialog}
    </div>
  );
}
