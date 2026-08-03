import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFormationDto {
  @IsString()
  @IsNotEmpty({ message: 'Le nom de la formation est obligatoire' })
  nom!: string;

  @IsString()
  @IsNotEmpty({ message: 'La description est obligatoire' })
  description!: string;
}
