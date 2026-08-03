import {
  Controller,
  Get,
  Patch,
  Body,
  Param,
  UseGuards,
  Post,
} from '@nestjs/common';
import { FormationService } from './formation.service';
import { ChangeFormationStatusDto } from './dto/change-status.dto';
import { Roles } from 'src/common/guards/roles.guard';
import { Role } from 'src/common/enums';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CreateFormationDto } from './dto/create-formation.dto';

@Controller('formations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FormationController {
  constructor(private readonly formationService: FormationService) {}

  @Get()
  async findAll() {
    return await this.formationService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.formationService.findOne(id);
  }
  @Patch(':id/statut')
  @Roles(Role.ADMIN)
  async changeStatus(
    @Param('id') id: string,
    @Body() dto: ChangeFormationStatusDto,
  ) {
    return await this.formationService.updateStatus(id, dto);
  }

  @Post()
  @Roles(Role.ADMIN)
  async create(@Body() dto: CreateFormationDto) {
    return await this.formationService.create(dto);
  }
}
