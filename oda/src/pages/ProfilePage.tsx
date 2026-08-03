import { FormEvent, useEffect, useState } from 'react';
import { usersService } from '@/api/users.service';
import { formationsService } from '@/api/formations.service';
import { getErrorMessage } from '@/api/errorMessage';
import { Formation } from '@/types/formation.types';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const toast = useToast();
  const [formations, setFormations] = useState<Formation[]>([]);
  const [nom, setNom] = useState(user?.nom ?? '');
  const [numero, setNumero] = useState(user?.numero ?? '');
  const [formationId, setFormationId] = useState(user?.formation?.id ?? '');
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingFormation, setSavingFormation] = useState(false);

  // Seules les formations OUVERTES sont proposées au choix.
  const availableFormations = formations.filter((f) => f.statut === 'OUVERTE');

  useEffect(() => {
    formationsService.getAll().then(setFormations).catch(() => setFormations([]));
  }, []);

  const handleProfileSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      const updated = await usersService.updateProfile({ nom, numero });
      setUser(updated);
      toast.success('Profil mis à jour.');
    } catch (err) {
      toast.error(getErrorMessage(err, 'Impossible de mettre à jour le profil.'));
    } finally {
      setSavingProfile(false);
    }
  };

  const handleFormationSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formationId) return;
    setSavingFormation(true);
    try {
      const updated = await usersService.selectFormation(formationId);
      setUser(updated);
      toast.success('Formation mise à jour.');
    } catch (err) {
      toast.error(getErrorMessage(err, 'Impossible de mettre à jour la formation.'));
    } finally {
      setSavingFormation(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <form
        onSubmit={handleProfileSubmit}
        className="flex flex-col gap-4 rounded-xl border border-ink/10 bg-white p-6 shadow-card"
      >
        <h2 className="text-lg font-bold text-ink">Mes informations</h2>
        <Input label="Nom" value={nom} onChange={(e) => setNom(e.target.value)} />
        <Input label="Email" value={user?.email ?? ''} disabled className="opacity-60" />
        <Input label="Téléphone" value={numero} onChange={(e) => setNumero(e.target.value)} />

        <div className="rounded-lg bg-brand-50 p-3 text-sm">
          <p className="text-ink/60">
            Cohorte :{' '}
            <span className="font-semibold text-ink">
              {user?.cohorte?.nom ?? "En attente d'affectation"}
            </span>
          </p>
        </div>

        <Button type="submit" loading={savingProfile} className="mt-2 w-fit">
          Enregistrer
        </Button>
      </form>

      <form
        onSubmit={handleFormationSubmit}
        className="flex flex-col gap-4 rounded-xl border border-ink/10 bg-white p-6 shadow-card"
      >
        <h2 className="text-lg font-bold text-ink">Ma formation</h2>

        <div className="flex items-center justify-between rounded-lg bg-brand-50 p-3 text-sm">
          <p className="text-ink/60">
            Actuelle :{' '}
            <span className="font-semibold text-ink">
              {user?.formation?.nom ?? 'Aucune formation sélectionnée'}
            </span>
          </p>
          {user?.formation && <Badge value={user.formation.statut} />}
        </div>

        {availableFormations.length === 0 ? (
          <p className="rounded-lg border border-ink/15 p-3 text-sm text-ink/70">
            Aucune formation n'est actuellement ouverte aux inscriptions.
          </p>
        ) : (
          <>
            <Select
              label="Choisir une formation (ouvertes uniquement)"
              value={formationId}
              onChange={(e) => setFormationId(e.target.value)}
            >
              <option value="">Sélectionner...</option>
              {availableFormations.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.nom}
                </option>
              ))}
            </Select>
            <Button
              type="submit"
              loading={savingFormation}
              disabled={!formationId}
              className="mt-2 w-fit"
            >
              Valider mon choix
            </Button>
          </>
        )}
      </form>
    </div>
  );
}
