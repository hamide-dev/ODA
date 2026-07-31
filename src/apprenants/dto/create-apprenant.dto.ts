import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  Max,
} from 'class-validator';
import { Sexe, StatutApprenant } from '../../common/enums';

export class CreateApprenantDto {
  @IsString()
  @IsNotEmpty({ message: 'Le nom est obligatoire' })
  nom!: string;

  @IsString()
  @IsNotEmpty({ message: 'Le prénom est obligatoire' })
  prenom!: string;

  @IsEmail({}, { message: "L'email doit être une adresse valide" })
  @IsNotEmpty({ message: "L'email est obligatoire" })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: 'Le numéro de téléphone est obligatoire' })
  telephone!: string;

  @IsEnum(Sexe, { message: 'Le sexe doit être M ou F' })
  @IsNotEmpty({ message: 'Le sexe est obligatoire' })
  sexe!: Sexe;

  @IsInt({ message: "L'âge doit être un nombre entier" })
  @Min(15, { message: "L'âge minimum est de 15 ans" })
  @Max(99, { message: "L'âge doit être valide" })
  @IsNotEmpty({ message: "L'âge est obligatoire" })
  age!: number;

  @IsString()
  @IsNotEmpty({ message: 'La ville est obligatoire' })
  ville!: string;

  @IsString()
  @IsNotEmpty({ message: "Le niveau d'étude est obligatoire" })
  niveauEtude!: string;

  @IsEnum(StatutApprenant, { message: 'Le statut invalide' })
  @IsOptional()
  statut?: StatutApprenant;

  @IsUUID('4', { message: "L'ID de la formation doit être un UUID valide" })
  @IsOptional()
  formationId?: string;

  @IsUUID('4', { message: "L'ID de la cohorte doit être un UUID valide" })
  @IsOptional()
  cohorteId?: string;
}
