import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Query,
  Delete,
  Put,
} from '@nestjs/common';
import { ApprenantsService } from './apprenants.service';
import { CreateApprenantDto } from './dto/create-apprenant.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/guards/roles.guard';
import { Role } from 'src/common/enums';
import { UpdateApprenantDto } from './dto/update-apprenant.dto';

@Controller('apprenants')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ApprenantsController {
  constructor(private readonly apprenantsService: ApprenantsService) {}

  @Post()
  @Roles(Role.ADMIN, Role.RESPONSABLE)
  async create(@Body() dto: CreateApprenantDto) {
    return this.apprenantsService.create(dto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.RESPONSABLE)
  async findAll() {
    return this.apprenantsService.findAll();
  }

  @Get('search')
  @Roles(Role.ADMIN, Role.RESPONSABLE)
  async search(@Query('q') query: string) {
    return this.apprenantsService.search(query);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.RESPONSABLE)
  async findOne(@Param('id') id: string) {
    return this.apprenantsService.findOne(id);
  }

  @Put(':id')
  @Roles(Role.ADMIN, Role.RESPONSABLE)
  async update(@Param('id') id: string, @Body() updateDto: UpdateApprenantDto) {
    return this.apprenantsService.update(id, updateDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.RESPONSABLE)
  async remove(@Param('id') id: string) {
    return this.apprenantsService.remove(id);
  }
}
