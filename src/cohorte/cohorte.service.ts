import { Injectable } from '@nestjs/common';
import { CreateCohorteDto } from './dto/create-cohorte.dto';
import { UpdateCohorteDto } from './dto/update-cohorte.dto';

@Injectable()
export class CohorteService {
  create(createCohorteDto: CreateCohorteDto) {
    return 'This action adds a new cohorte';
  }

  findAll() {
    return `This action returns all cohorte`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cohorte`;
  }

  update(id: number, updateCohorteDto: UpdateCohorteDto) {
    return `This action updates a #${id} cohorte`;
  }

  remove(id: number) {
    return `This action removes a #${id} cohorte`;
  }
}
