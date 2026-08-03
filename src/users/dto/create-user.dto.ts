import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsNumber,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Role, Sexe } from 'src/common/enums';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  nom!: string;

  @IsString()
  @IsNotEmpty()
  prenom!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsNumber()
  age!: number;

  @IsString()
  @IsNotEmpty()
  numero!: string;

  @IsEnum(Sexe)
  sexe!: Sexe;

  @IsString()
  @IsNotEmpty()
  ville!: string;

  @IsString()
  @IsNotEmpty()
  niveauEtude!: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
