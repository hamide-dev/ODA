import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cohorte } from 'src/cohorte/entities/cohorte.entity';
import { Apprenant } from '../../apprenants/entities/apprenant.entity';

@Entity('formations')
export class Formation {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  nom!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @OneToMany(() => Cohorte, (cohorte) => cohorte.formation)
  cohortes!: Cohorte[];

  @OneToMany(() => Apprenant, (apprenant) => apprenant.formation)
  apprenants!: Apprenant[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
