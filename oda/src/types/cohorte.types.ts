import { Formation } from './formation.types';

export interface Cohorte {
  id: string;
  nom?: string;
  formation?: Formation;
}

export interface CreateCohortePayload {
  formationId: string;
}
