import apiClient from './apiClient';
import { normalizeList } from './normalizeList';
import { Cohorte, CreateCohortePayload } from '@/types/cohorte.types';

export const cohortesService = {
  getAll: async (): Promise<Cohorte[]> => {
    const { data } = await apiClient.get('/cohorte');
    return normalizeList<Cohorte>(data, 'cohortesService.getAll');
  },

  getById: async (id: string): Promise<Cohorte> => {
    const { data } = await apiClient.get<Cohorte>(`/cohorte/${id}`);
    return data;
  },

  create: async (payload: CreateCohortePayload): Promise<Cohorte> => {
    const { data } = await apiClient.post<Cohorte>('/cohorte', payload);
    return data;
  },

  remove: async (id: string): Promise<void> => {
    await apiClient.delete(`/cohorte/${id}`);
  },
};
