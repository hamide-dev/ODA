import { IsNotEmpty, IsUUID } from 'class-validator';

export class SelectFormationDto {
  @IsUUID()
  @IsNotEmpty({ message: "L'ID de la formation est obligatoire" })
  formationId!: string;
}
