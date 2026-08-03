import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Formation } from '../formation/entities/formation.entity';
import { SelectFormationDto } from 'src/formation/dto/select-formation';
import { FormationStatus } from '../formation/enums/formation-status.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Formation)
    private readonly formationRepository: Repository<Formation>,
  ) {}

  async create(createUserDto: any): Promise<User> {
    const user = this.userRepository.create(createUserDto as Partial<User>);
    return await this.userRepository.save(user);
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        formation: true,
        cohorte: true,
      },
    });
    if (!user) {
      throw new NotFoundException('Utilisateur introuvable');
    }
    return user;
  }

  async getProfile(userId: string): Promise<User> {
    return this.findOne(userId);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email },
      relations: {
        formation: true,
        cohorte: true,
      },
    });
  }

  async findByEmailWithPassword(email: string): Promise<User | null> {
    return await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .leftJoinAndSelect('user.cohorte', 'cohorte')
      .leftJoinAndSelect('user.formation', 'formation')
      .where('user.email = :email', { email })
      .getOne();
  }

  async selectFormation(
    userId: string,
    selectFormationDto: SelectFormationDto,
  ): Promise<User> {
    const { formationId } = selectFormationDto;

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Utilisateur introuvable');
    }

    const formation = await this.formationRepository.findOne({
      where: { id: formationId },
      relations: {
        cohorte: true,
      },
    });

    if (!formation) {
      throw new NotFoundException('Formation introuvable');
    }

    if (formation.statut !== FormationStatus.OUVERTE) {
      throw new BadRequestException(
        `Impossible de postuler : cette formation est actuellement "${formation.statut}".`,
      );
    }

    user.formation = formation;
    user.cohorte = formation.cohorte;

    return await this.userRepository.save(user);
  }

  async findAllApprenants(search?: string): Promise<User[]> {
    const query = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.cohorte', 'cohorte')
      .leftJoinAndSelect('user.formation', 'formation');

    if (search) {
      query.where(
        'user.nom ILIKE :search OR user.prenom ILIKE :search OR user.email ILIKE :search',
        { search: `%${search}%` },
      );
    }

    return await query.getMany();
  }

  async update(id: string, updateDto: any): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, updateDto);
    return await this.userRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }
}
