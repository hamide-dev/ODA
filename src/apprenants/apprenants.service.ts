import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Apprenant } from './entities/apprenant.entity';
import { CreateApprenantDto } from './dto/create-apprenant.dto';
import { UpdateApprenantDto } from './dto/update-apprenant.dto';

@Injectable()
export class ApprenantsService {
  constructor(
    @InjectRepository(Apprenant)
    private readonly apprenantRepository: Repository<Apprenant>,
  ) {}

  // 1. Enregistrer un nouvel apprenant
  async create(dto: CreateApprenantDto): Promise<Apprenant> {
    const existing = await this.apprenantRepository.findOne({
      where: { email: dto.email },
    });
    if (existing) {
      throw new ConflictException('Un apprenant avec cet email existe déjà');
    }

    const { formationId, cohorteId, ...apprenantData } = dto;

    const apprenant = this.apprenantRepository.create({
      ...apprenantData,
      formation: formationId ? ({ id: formationId } as any) : null,
      cohorte: cohorteId ? ({ id: cohorteId } as any) : null,
    });

    return await this.apprenantRepository.save(apprenant);
  }

  async findAll(): Promise<Apprenant[]> {
    return await this.apprenantRepository.find({
      relations: { formation: true, cohorte: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Apprenant> {
    const apprenant = await this.apprenantRepository.findOne({
      where: { id },
      relations: { formation: true, cohorte: true },
    });

    if (!apprenant) {
      throw new NotFoundException(`Apprenant avec l'ID "${id}" introuvable`);
    }

    return apprenant;
  }

  async update(id: string, updateDto: UpdateApprenantDto): Promise<Apprenant> {
    const apprenant = await this.findOne(id);

    if (updateDto.email && updateDto.email !== apprenant.email) {
      const existingEmail = await this.apprenantRepository.findOne({
        where: { email: updateDto.email },
      });
      if (existingEmail) {
        throw new ConflictException(
          'Cet email est déjà utilisé par un autre apprenant',
        );
      }
    }

    const { formationId, cohorteId, ...updateData } = updateDto;

    if (formationId !== undefined) {
      apprenant.formation = formationId ? ({ id: formationId } as any) : null;
    }

    if (cohorteId !== undefined) {
      apprenant.cohorte = cohorteId ? ({ id: cohorteId } as any) : null;
    }

    Object.assign(apprenant, updateData);

    return await this.apprenantRepository.save(apprenant);
  }

  async remove(id: string): Promise<{ message: string }> {
    const apprenant = await this.findOne(id);
    await this.apprenantRepository.remove(apprenant);
    return {
      message: `L'apprenant avec l'ID "${id}" a été supprimé avec succès`,
    };
  }

  async search(query: string): Promise<Apprenant[]> {
    if (!query || query.trim() === '') {
      return this.findAll();
    }

    const searchPattern = `%${query.trim()}%`;

    return await this.apprenantRepository.find({
      where: [
        { nom: Like(searchPattern) },
        { prenom: Like(searchPattern) },
        { email: Like(searchPattern) },
      ],
      relations: { formation: true, cohorte: true },
    });
  }
}
