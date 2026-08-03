import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';

export function PublicNavbar() {
  const { isAuthenticated } = useAuth();

  return (
    <header className="flex items-center justify-between border-b border-ink/10 bg-white px-6 py-4 md:px-10">
      <Link to="/accueil" className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-lg font-black text-white">
          O
        </div>
        <div>
          <p className="text-sm font-bold leading-tight text-ink">ODC Manager</p>
          <p className="text-xs text-ink/50">Orange Digital Center</p>
        </div>
      </Link>

      <nav className="flex items-center gap-2">
        {isAuthenticated ? (
          <Link to="/dashboard">
            <Button>Mon espace</Button>
          </Link>
        ) : (
          <>
            <Link to="/login">
              <Button variant="secondary">Se connecter</Button>
            </Link>
            <Link to="/register">
              <Button>S'inscrire</Button>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
