import { IsEnum, IsNotEmpty } from 'class-validator';
import { FormationStatus } from '../enums/formation-status.enum';

export class ChangeFormationStatusDto {
  @IsEnum(FormationStatus, {
    message: `Le statut doit être l'un des suivants : ${Object.values(FormationStatus).join(', ')}`,
  })
  @IsNotEmpty({ message: 'Le statut est obligatoire' })
  statut!: FormationStatus;
}
