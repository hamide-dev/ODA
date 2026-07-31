import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Formation } from 'src/formation/entities/formation.entity';
import { Apprenant } from '../../apprenants/entities/apprenant.entity';

@Entity('cohortes')
export class Cohorte {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  nom!: string;

  @Column({ type: 'date', nullable: true })
  dateDebut!: Date;

  @Column({ type: 'date', nullable: true })
  dateFin!: Date;

  @ManyToOne(() => Formation, (formation) => formation.cohortes, {
    onDelete: 'CASCADE',
  })
  formation!: Formation;

  @OneToMany(() => Apprenant, (apprenant) => apprenant.cohorte)
  apprenants!: Apprenant[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
