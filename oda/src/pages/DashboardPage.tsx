import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { usersService } from '@/api/users.service';
import { formationsService } from '@/api/formations.service';
import { cohortesService } from '@/api/cohortes.service';
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface Stats {
  apprenants: number;
  formations: number;
  cohortes: number;
}

function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    Promise.all([usersService.getAll(), formationsService.getAll(), cohortesService.getAll()])
      .then(([apprenants, formations, cohortes]) =>
        setStats({ apprenants: apprenants.length, formations: formations.length, cohortes: cohortes.length })
      )
      .catch(() => setStats({ apprenants: 0, formations: 0, cohortes: 0 }));
  }, []);

  const cards = [
    { label: 'Apprenants', value: stats?.apprenants, accent: 'bg-brand text-white' },
    { label: 'Formations', value: stats?.formations, accent: 'bg-white text-ink border border-ink/10' },
    { label: 'Cohortes', value: stats?.cohortes, accent: 'bg-white text-ink border border-ink/10' },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <div key={card.label} className={`rounded-xl p-5 shadow-card ${card.accent}`}>
          <p className="text-sm opacity-80">{card.label}</p>
          <p className="mt-2 text-3xl font-black">{card.value ?? '—'}</p>
        </div>
      ))}
    </div>
  );
}

function ApprenantDashboard() {
  const { user } = useAuth();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="rounded-xl border border-ink/10 bg-white p-6 shadow-card">
        <p className="text-sm text-ink/60">Ma cohorte</p>
        <p className="mt-2 text-lg font-bold text-ink">
          {user?.cohorte?.nom ?? "En attente d'affectation"}
        </p>
        {!user?.cohorte && (
          <p className="mt-1 text-xs text-ink/50">
            Contactez l'administration pour être rattaché à une cohorte.
          </p>
        )}
      </div>

      <div className="rounded-xl border border-ink/10 bg-white p-6 shadow-card">
        <p className="text-sm text-ink/60">Ma formation</p>
        {user?.formation ? (
          <div className="mt-2 flex items-center justify-between">
            <p className="text-lg font-bold text-ink">{user.formation.nom}</p>
            <Badge value={user.formation.statut} />
          </div>
        ) : (
          <div className="mt-3">
            <p className="text-sm text-ink/70">Vous n'avez pas encore choisi de formation.</p>
            <Link to="/accueil">
              <Button className="mt-3">Choisir ma formation</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user, isAdmin } = useAuth();
  return (
    <div>
      <p className="mb-6 text-sm text-ink/60">
        Bienvenue, <span className="font-semibold text-ink">{user?.prenom}</span> 👋
      </p>
      {isAdmin ? <AdminDashboard /> : <ApprenantDashboard />}
    </div>
  );
}
