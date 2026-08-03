import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { authService } from '@/api/auth.service';
import { TOKEN_STORAGE_KEY } from '@/api/apiClient';
import { AppUser, LoginPayload } from '@/types/user.types';

interface AuthContextValue {
  user: AppUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  loginApprenant: (payload: LoginPayload) => Promise<void>;
  loginAdmin: (payload: LoginPayload) => Promise<void>;
  setUser: (user: AppUser) => void;
  logout: () => void;
}

const USER_STORAGE_KEY = 'odc_current_user';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (storedUser && token) setUserState(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  const persist = (token: string, u: AppUser) => {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(u));
    setUserState(u);
  };

  const loginApprenant = async (payload: LoginPayload) => {
    const { access_token, user: u } = await authService.loginApprenant(payload);
    persist(access_token, { ...u, role: 'APPRENANT' });
  };

  const loginAdmin = async (payload: LoginPayload) => {
    const { access_token, admin } = await authService.loginAdmin(payload);
    persist(access_token, { ...admin, role: 'ADMIN' });
  };

  const setUser = (u: AppUser) => {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(u));
    setUserState(u);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    setUserState(null);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'ADMIN',
      loading,
      loginApprenant,
      loginAdmin,
      setUser,
      logout,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth doit être utilisé à l'intérieur de <AuthProvider>");
  return ctx;
}
