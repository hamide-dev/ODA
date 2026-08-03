import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cohorte } from '../../cohorte/entities/cohorte.entity';
import { User } from '../../users/entities/user.entity';
import { FormationStatus } from '../enums/formation-status.enum';

@Entity('formations')
export class Formation {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  nom!: string;

  @Column('text')
  description!: string;

  @Column({
    type: 'enum',
    enum: FormationStatus,
    default: FormationStatus.BROUILLON,
  })
  statut!: FormationStatus;

  @ManyToOne(() => Cohorte, (cohorte) => cohorte.formations, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'cohorteId' })
  cohorte!: Cohorte;

  @OneToMany(() => User, (user) => user.formation)
  users!: User[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
