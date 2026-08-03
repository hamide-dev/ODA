import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formationsService } from '@/api/formations.service';
import { usersService } from '@/api/users.service';
import { getErrorMessage } from '@/api/errorMessage';
import { Formation } from '@/types/formation.types';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { PublicNavbar } from '@/components/layout/PublicNavbar';

// BROUILLON et ARCHIVEE ne doivent jamais apparaître dans le catalogue public.
const VISIBLE_STATUTS = ['OUVERTE', 'EN_COURS', 'TERMINEE'];

export default function PublicFormationsPage() {
  const { isAuthenticated, isAdmin, user, setUser } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectingId, setSelectingId] = useState<string | null>(null);

  useEffect(() => {
    formationsService
      .getAll()
      .then((all) => setFormations(all.filter((f) => VISIBLE_STATUTS.includes(f.statut))))
      .catch(() => setFormations([]))
      .finally(() => setLoading(false));
  }, []);

  const handleChoose = async (formation: Formation) => {
    if (!isAuthenticated) {
      toast.error('Connectez-vous (ou inscrivez-vous) pour choisir une formation.');
      navigate('/login');
      return;
    }

    setSelectingId(formation.id);
    try {
      const updated = await usersService.selectFormation(formation.id);
      setUser(updated);
      toast.success(`Formation "${formation.nom}" sélectionnée.`);
      navigate('/dashboard');
    } catch (err) {
      toast.error(getErrorMessage(err, 'Impossible de sélectionner cette formation.'));
    } finally {
      setSelectingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />

      <main className="mx-auto max-w-5xl px-6 py-10 md:px-10">
        <h1 className="text-3xl font-black text-ink">Nos formations</h1>
        <p className="mt-2 max-w-xl text-sm text-ink/60">
          Parcourez librement le catalogue. La connexion et un rattachement à une cohorte
          sont requis pour valider votre choix de formation.
        </p>

        {isAuthenticated && !isAdmin && !user?.formation && (
          <div className="mt-6 rounded-xl border border-ink/15 bg-brand-50 p-4 text-sm text-ink/80">
            Choisissez une formation ci-dessous : vous serez automatiquement rattaché à sa
            cohorte.
          </div>
        )}

        {loading && <p className="mt-8 text-sm text-ink/50">Chargement des formations...</p>}

        {!loading && formations.length === 0 && (
          <p className="mt-8 text-sm text-ink/50">Aucune formation disponible pour le moment.</p>
        )}

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {formations.map((f) => {
            const isCurrent = user?.formation?.id === f.id;
            const isOuverte = f.statut === 'OUVERTE';
            const canChoose = !isAdmin && isOuverte && !isCurrent;

            return (
              <div
                key={f.id}
                className="flex flex-col justify-between rounded-xl border border-ink/10 bg-white p-5 shadow-card"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="text-lg font-bold text-ink">{f.nom}</h2>
                    <Badge value={f.statut} />
                  </div>
                  <p className="mt-2 text-sm text-ink/60">
                    {f.description || 'Description à venir.'}
                  </p>
                  {f.cohorte && (
                    <p className="mt-2 text-xs font-medium text-brand-700">
                      Cohorte : {f.cohorte.nom}
                    </p>
                  )}
                </div>

                {!isAdmin && (
                  <Button
                    onClick={() => handleChoose(f)}
                    disabled={!canChoose}
                    loading={selectingId === f.id}
                    variant={isCurrent ? 'secondary' : 'primary'}
                    className="mt-5 w-full"
                  >
                    {isCurrent
                      ? 'Formation actuelle'
                      : isOuverte
                        ? 'Choisir cette formation'
                        : 'Inscriptions fermées'}
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
