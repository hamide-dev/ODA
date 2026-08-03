import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Formation } from './entities/formation.entity';
import { ChangeFormationStatusDto } from './dto/change-status.dto';
import { CreateFormationDto } from './dto/create-formation.dto';

@Injectable()
export class FormationService {
  constructor(
    @InjectRepository(Formation)
    private readonly formationRepository: Repository<Formation>,
  ) {}

  async create(dto: CreateFormationDto): Promise<Formation> {
    const formation = this.formationRepository.create(dto);
    return await this.formationRepository.save(formation);
  }

  async findAll(): Promise<Formation[]> {
    return await this.formationRepository.find({
      relations: { cohorte: true },
    });
  }

  async findOne(id: string): Promise<Formation> {
    const formation = await this.formationRepository.findOne({
      where: { id },
      relations: { cohorte: true },
    });
    if (!formation) throw new NotFoundException('Formation introuvable');
    return formation;
  }

  async updateStatus(
    id: string,
    dto: ChangeFormationStatusDto,
  ): Promise<Formation> {
    const formation = await this.findOne(id);
    formation.statut = dto.statut;
    return await this.formationRepository.save(formation);
  }
}
