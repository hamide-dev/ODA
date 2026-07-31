import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Formation } from 'src/formation/entities/formation.entity';
import { Cohorte } from 'src/cohorte/entities/cohorte.entity';
import { Sexe, StatutApprenant } from '../../common/enums';

@Entity('apprenants')
export class Apprenant {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  nom!: string;

  @Column()
  prenom!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  telephone!: string;

  @Column({ type: 'enum', enum: Sexe })
  sexe!: Sexe;

  @Column({ type: 'int' })
  age!: number;

  @Column()
  ville!: string;

  @Column()
  niveauEtude!: string;

  @CreateDateColumn({ type: 'date' })
  dateInscription!: Date;

  @Column({
    type: 'enum',
    enum: StatutApprenant,
    default: StatutApprenant.EN_COURS,
  })
  statut!: StatutApprenant;

  @ManyToOne(() => Formation, (formation) => formation.apprenants, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  formation!: Formation;

  @ManyToOne(() => Cohorte, (cohorte) => cohorte.apprenants, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  cohorte!: Cohorte;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
