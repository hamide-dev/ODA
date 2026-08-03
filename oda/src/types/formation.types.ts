export type FormationStatut = 'BROUILLON' | 'OUVERTE' | 'EN_COURS' | 'TERMINEE' | 'ARCHIVEE';

export interface FormationCohorteRef {
  id: string;
  nom: string;
}

export interface Formation {
  id: string;
  nom: string;
  description?: string;
  statut: FormationStatut;
  cohorte?: FormationCohorteRef | null;
}

export interface CreateFormationPayload {
  nom: string;
  description?: string;
}

export type UpdateFormationPayload = Partial<CreateFormationPayload>;
