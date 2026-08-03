import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Role } from 'src/common/enums';
import { Cohorte } from '../../cohorte/entities/cohorte.entity';
import { Formation } from '../../formation/entities/formation.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  password!: string;

  @Column()
  prenom!: string;

  @Column()
  nom!: string;

  @Column({ nullable: true })
  age!: number;

  @Column({ nullable: true })
  numero!: string;

  @Column({ nullable: true })
  sexe!: string;

  @Column({ nullable: true })
  telephone!: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.APPRENANT,
  })
  role!: Role;

  @Column({ default: true })
  isActive!: boolean;

  @ManyToOne(() => Cohorte, (cohorte) => cohorte.users, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @ManyToOne(() => Cohorte, (cohorte) => cohorte.users, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'cohorteId' })
  cohorte!: Cohorte;

  @ManyToOne(() => Formation, (formation) => formation.users, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'formationId' })
  formation!: Formation;
}
