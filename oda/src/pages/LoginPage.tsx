import { FormEvent, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { getErrorMessage } from '@/api/errorMessage';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  const { loginApprenant, loginAdmin, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'apprenant' | 'admin'>('apprenant');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'admin') {
        await loginAdmin({ email, password });
      } else {
        await loginApprenant({ email, password });
      }
      navigate('/dashboard');
    } catch (err) {
      setError(getErrorMessage(err, 'Identifiants invalides.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-card md:grid-cols-2">
        {/* Panneau de marque — seul bloc où l'orange domine */}
        <div className="hidden flex-col justify-between bg-brand p-10 text-white md:flex">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-lg font-black text-brand">
            O
          </div>
          <div>
            <h2 className="text-2xl font-black leading-tight">Orange Digital Center</h2>
            <p className="mt-2 text-sm text-white/85">
              Gérez les apprenants, formations et cohortes depuis un seul espace.
            </p>
          </div>
          <p className="text-xs text-white/60">© {new Date().getFullYear()} Orange Digital Center</p>
        </div>

        {/* Formulaire */}
        <div className="flex flex-col justify-center p-8 md:p-10">
          <Link to="/accueil" className="mb-4 w-fit text-xs font-semibold text-ink/50 hover:text-brand">
            ← Voir les formations sans se connecter
          </Link>

          <div className="mb-6 flex rounded-lg border border-ink/15 p-1">
            <button
              type="button"
              onClick={() => setMode('apprenant')}
              className={`flex-1 rounded-md py-2 text-sm font-semibold transition-colors ${
                mode === 'apprenant' ? 'bg-brand text-white' : 'text-ink/60'
              }`}
            >
              Espace Apprenant
            </button>
            <button
              type="button"
              onClick={() => setMode('admin')}
              className={`flex-1 rounded-md py-2 text-sm font-semibold transition-colors ${
                mode === 'admin' ? 'bg-ink text-white' : 'text-ink/60'
              }`}
            >
              Espace Admin
            </button>
          </div>

          <h1 className="text-2xl font-bold text-ink">Connexion</h1>
          <p className="mt-1 text-sm text-ink/60">
            {mode === 'admin'
              ? 'Accès réservé au panel back-office.'
              : 'Accédez à votre espace apprenant.'}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <Input
              id="email"
              type="email"
              label="Adresse email"
              placeholder="vous@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              id="password"
              type="password"
              label="Mot de passe"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <p className="rounded-lg border border-ink px-3 py-2 text-sm text-ink">{error}</p>
            )}

            <Button type="submit" loading={loading} className="mt-2 w-full">
              Se connecter
            </Button>
          </form>

          {mode === 'apprenant' && (
            <p className="mt-4 text-center text-sm text-ink/60">
              Pas encore de compte ?{' '}
              <Link to="/register" className="font-semibold text-brand hover:underline">
                Inscrivez-vous
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
