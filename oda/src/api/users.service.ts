import apiClient from './apiClient';
import { normalizeList } from './normalizeList';
import {
  AppUser,
  RegisterPayload,
  UpdateProfilePayload,
  UpdateUserPayload,
} from '@/types/user.types';

export const usersService = {
  getProfile: async (): Promise<AppUser> => {
    const { data } = await apiClient.get<AppUser>('/users/profile');
    return data;
  },

  updateProfile: async (payload: UpdateProfilePayload): Promise<AppUser> => {
    const { data } = await apiClient.patch<AppUser>('/users/profile', payload);
    return data;
  },

  selectFormation: async (formationId: string): Promise<AppUser> => {
    const { data } = await apiClient.post<AppUser>('/users/select-formation', {
      formationId,
    });
    return data;
  },

  getAll: async (search?: string): Promise<AppUser[]> => {
    const { data } = await apiClient.get('/users', {
      params: search ? { search } : undefined,
    });
    return normalizeList<AppUser>(data, 'usersService.getAll');
  },

  getById: async (id: string): Promise<AppUser> => {
    const { data } = await apiClient.get<AppUser>(`/users/${id}`);
    return data;
  },

  create: async (payload: RegisterPayload): Promise<AppUser> => {
    const { data } = await apiClient.post<AppUser>('/users', payload);
    return data;
  },

  update: async (id: string, payload: UpdateUserPayload): Promise<AppUser> => {
    const { data } = await apiClient.patch<AppUser>(`/users/${id}`, payload);
    return data;
  },

  remove: async (id: string): Promise<void> => {
    await apiClient.delete(`/users/${id}`);
  },
};
