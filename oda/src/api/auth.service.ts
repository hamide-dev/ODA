import apiClient from './apiClient';
import {
  AdminLoginResponse,
  ApprenantLoginResponse,
  LoginPayload,
  RegisterPayload,
  AppUser,
} from '@/types/user.types';

export const authService = {
  register: async (payload: RegisterPayload): Promise<AppUser> => {
    const { data } = await apiClient.post<AppUser>('/auth/register', payload);
    return data;
  },

  loginApprenant: async (
    payload: LoginPayload,
  ): Promise<ApprenantLoginResponse> => {
    const { data } = await apiClient.post<ApprenantLoginResponse>(
      '/auth/login',
      payload,
    );
    return data;
  },

  loginAdmin: async (payload: LoginPayload): Promise<AdminLoginResponse> => {
    const { data } = await apiClient.post<AdminLoginResponse>(
      '/auth/admin/login',
      payload,
    );
    return data;
  },
};
