import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export function Topbar({ title }: { title: string }) {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between border-b border-ink/10 bg-white px-8 py-4">
      <h1 className="text-xl font-bold text-ink">{title}</h1>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-semibold text-ink">
            {user?.prenom} {user?.nom}
          </p>
          {user && <Badge value={user.role} />}
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-100 bg-brand-50 text-sm font-bold text-brand-700">
          {user?.prenom?.[0]}
          {user?.nom?.[0]}
        </div>
        <Button variant="secondary" onClick={logout}>
          Déconnexion
        </Button>
      </div>
    </header>
  );
}
