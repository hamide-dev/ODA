import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '@/api/auth.service';
import { getErrorMessage } from '@/api/errorMessage';
import { RegisterPayload, Sexe } from '@/types/user.types';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

const emptyForm: RegisterPayload = {
  nom: '',
  prenom: '',
  email: '',
  password: '',
  age: 18,
  numero: '',
  sexe: 'M',
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<RegisterPayload>(emptyForm);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authService.register(form);
      navigate('/login');
    } catch (err) {
      setError(getErrorMessage(err, "Impossible de créer le compte."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      <div className="w-full max-w-lg rounded-2xl border border-ink/10 p-8 shadow-card">
        <Link to="/accueil" className="mb-4 inline-block text-xs font-semibold text-ink/50 hover:text-brand">
          ← Voir les formations sans se connecter
        </Link>

        <div className="mb-6 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-lg font-black text-white">
            O
          </div>
          <p className="text-sm font-bold text-ink">Orange Digital Center</p>
        </div>

        <h1 className="text-2xl font-bold text-ink">Créer un compte apprenant</h1>
        <p className="mt-1 text-sm text-ink/60">Rejoignez l'ODC en quelques secondes.</p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
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
              min={1}
              value={form.age}
              onChange={(e) => setForm({ ...form, age: Number(e.target.value) })}
              required
            />
            <div className="col-span-2">
              <Input
                label="Téléphone"
                value={form.numero}
                onChange={(e) => setForm({ ...form, numero: e.target.value })}
                placeholder="+225..."
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

          {error && (
            <p className="rounded-lg border border-ink px-3 py-2 text-sm text-ink">{error}</p>
          )}

          <Button type="submit" loading={loading} className="mt-2 w-full">
            Créer mon compte
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-ink/60">
          Déjà inscrit ?{' '}
          <Link to="/login" className="font-semibold text-brand hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
