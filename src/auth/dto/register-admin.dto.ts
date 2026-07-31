import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from '../../common/enums';

export class RegisterAdminDto {
  @IsString()
  @IsNotEmpty({ message: 'Le nom est requis' })
  nom!: string;

  @IsString()
  @IsNotEmpty({ message: 'Le prénom est requis' })
  prenom!: string;

  @IsEmail({}, { message: 'L email doit être valide' })
  @IsNotEmpty({ message: 'L email est requis' })
  email!: string;

  @IsString()
  @MinLength(6, {
    message: 'Le mot de passe doit contenir au moins 6 caractères',
  })
  @IsNotEmpty({ message: 'Le mot de passe est requis' })
  password!: string;

  @IsEnum(Role, { message: 'Le rôle doit être ADMIN ou RESPONSABLE' })
  @IsOptional()
  role?: Role;
}
