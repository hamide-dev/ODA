import { Formation } from './formation.types';

export type Role = 'APPRENANT' | 'ADMIN';
export type Sexe = 'M' | 'F';

export interface CohorteRef {
  id: string;
  nom: string;
}

export interface AppUser {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  role: Role;
  age?: number;
  numero?: string;
  sexe?: Sexe;
  permissions?: string[];
  cohorte?: CohorteRef | null;
  formation?: Formation | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface RegisterPayload {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  age: number;
  numero: string;
  sexe: Sexe;
  niveauEtude: string;
  ville: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ApprenantLoginResponse {
  access_token: string;
  user: AppUser;
}

export interface AdminLoginResponse {
  access_token: string;
  admin: AppUser;
}

export interface UpdateProfilePayload {
  nom?: string;
  numero?: string;
}

export interface UpdateUserPayload {
  nom?: string;
  prenom?: string;
  email?: string;
  numero?: string;
  cohorteId?: string;
  formationId?: string;
  statut?: string;
  niveauEtude?: string;
  ville?: string;
}
