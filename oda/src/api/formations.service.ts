import apiClient from './apiClient';
import { normalizeList } from './normalizeList';
import {
  CreateFormationPayload,
  Formation,
  FormationStatut,
  UpdateFormationPayload,
} from '@/types/formation.types';

export const formationsService = {
  getAll: async (): Promise<Formation[]> => {
    const { data } = await apiClient.get('/formations');
    return normalizeList<Formation>(data, 'formationsService.getAll');
  },

  getById: async (id: string): Promise<Formation> => {
    const { data } = await apiClient.get<Formation>(`/formations/${id}`);
    return data;
  },

  // Ne jamais envoyer cohorteId ici — le backend ne l'attend pas à la création.
  create: async (payload: CreateFormationPayload): Promise<Formation> => {
    const { data } = await apiClient.post<Formation>('/formations', payload);
    return data;
  },

  update: async (id: string, payload: UpdateFormationPayload): Promise<Formation> => {
    const { data } = await apiClient.patch<Formation>(`/formations/${id}`, payload);
    return data;
  },

  // Endpoint dédié pour le changement de statut (ADMIN)
  updateStatut: async (id: string, statut: FormationStatut): Promise<Formation> => {
    const { data } = await apiClient.patch<Formation>(`/formations/${id}/statut`, { statut });
    return data;
  },

  remove: async (id: string): Promise<void> => {
    await apiClient.delete(`/formations/${id}`);
  },
};
