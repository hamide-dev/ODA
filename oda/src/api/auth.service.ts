import apiClient from './apiClient';
import {
  AdminLoginResponse,
  ApprenantLoginResponse,
  LoginPayload,
  RegisterPayload,
  AppUser,
} from '@/types/user.types';

export const authService = {
  // Inscription publique — crée toujours un compte APPRENANT
  register: async (payload: RegisterPayload): Promise<AppUser> => {
    const { data } = await apiClient.post<AppUser>('/auth/register', payload);
    return data;
  },

  // Connexion apprenant — rejette les comptes ADMIN
  loginApprenant: async (payload: LoginPayload): Promise<ApprenantLoginResponse> => {
    const { data } = await apiClient.post<ApprenantLoginResponse>('/auth/login', payload);
    return data;
  },

  // Connexion admin — rejette les comptes APPRENANT (403)
  loginAdmin: async (payload: LoginPayload): Promise<AdminLoginResponse> => {
    const { data } = await apiClient.post<AdminLoginResponse>('/auth/admin/login', payload);
    return data;
  },
};
