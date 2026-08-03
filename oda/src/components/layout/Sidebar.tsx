import { NavLink } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const ADMIN_LINKS = [
  { to: '/dashboard', label: 'Tableau de bord', icon: '◧' },
  { to: '/apprenants', label: 'Apprenants', icon: '◍' },
  { to: '/formations', label: 'Formations', icon: '◎' },
  { to: '/cohortes', label: 'Cohortes', icon: '◫' },
];

const APPRENANT_LINKS = [
  { to: '/dashboard', label: 'Mon espace', icon: '◧' },
  { to: '/profil', label: 'Mon profil', icon: '◍' },
];

export function Sidebar() {
  const { isAdmin } = useAuth();
  const links = isAdmin ? ADMIN_LINKS : APPRENANT_LINKS;

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-ink/10 bg-white">
      <div className="flex items-center gap-2 border-b border-ink/10 px-6 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-lg font-black text-white">
          O
        </div>
        <div>
          <p className="text-sm font-bold leading-tight text-ink">ODC Manager</p>
          <p className="text-xs text-ink/50">Orange Digital Center</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-brand text-white shadow-card'
                  : 'text-ink/70 hover:bg-brand-50 hover:text-brand-700'
              }`
            }
          >
            <span className="text-base">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
