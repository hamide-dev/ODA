import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3 bg-white text-center">
      <p className="text-6xl font-black text-brand">404</p>
      <p className="text-ink/60">Cette page n'existe pas.</p>
      <Link to="/dashboard" className="font-semibold text-brand hover:underline">
        Retour au tableau de bord
      </Link>
    </div>
  );
}
