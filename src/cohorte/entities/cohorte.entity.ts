import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Formation } from '../../formation/entities/formation.entity';
import { User } from '../../users/entities/user.entity';

@Entity('cohortes')
export class Cohorte {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  nom!: string;

  @OneToMany(() => Formation, (formation) => formation.cohorte)
  formations!: Formation[];

  @OneToMany(() => User, (user) => user.cohorte)
  users!: User[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
