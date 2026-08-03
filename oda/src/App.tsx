import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { ProtectedRoute } from '@/routes/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import PublicFormationsPage from '@/pages/PublicFormationsPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import DashboardPage from '@/pages/DashboardPage';
import ProfilePage from '@/pages/ProfilePage';
import ApprenantsPage from '@/pages/ApprenantsPage';
import FormationsPage from '@/pages/FormationsPage';
import CohortesPage from '@/pages/CohortesPage';
import NotFoundPage from '@/pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public — la racine redirige vers la route nommée "accueil" */}
          <Route path="/" element={<Navigate to="/accueil" replace />} />
          <Route path="/accueil" element={<PublicFormationsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Connecté — APPRENANT ou ADMIN */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout title="Tableau de bord" />}>
              <Route path="/dashboard" element={<DashboardPage />} />
            </Route>
            <Route element={<DashboardLayout title="Mon profil" />}>
              <Route path="/profil" element={<ProfilePage />} />
            </Route>
          </Route>

          {/* Panel admin — STRICTEMENT réservé au rôle ADMIN.
              Un APPRENANT qui tape l'URL directement est renvoyé vers /dashboard
              (voir ProtectedRoute : adminOnly && !isAdmin -> redirect). */}
          <Route element={<ProtectedRoute adminOnly />}>
            <Route element={<DashboardLayout title="Apprenants" />}>
              <Route path="/apprenants" element={<ApprenantsPage />} />
            </Route>
            <Route element={<DashboardLayout title="Formations" />}>
              <Route path="/formations" element={<FormationsPage />} />
            </Route>
            <Route element={<DashboardLayout title="Cohortes" />}>
              <Route path="/cohortes" element={<CohortesPage />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
