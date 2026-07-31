import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CohorteService } from './cohorte.service';
import { CreateCohorteDto } from './dto/create-cohorte.dto';
import { UpdateCohorteDto } from './dto/update-cohorte.dto';

@Controller('cohorte')
export class CohorteController {
  constructor(private readonly cohorteService: CohorteService) {}

  @Post()
  create(@Body() createCohorteDto: CreateCohorteDto) {
    return this.cohorteService.create(createCohorteDto);
  }

  @Get()
  findAll() {
    return this.cohorteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cohorteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCohorteDto: UpdateCohorteDto) {
    return this.cohorteService.update(+id, updateCohorteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cohorteService.remove(+id);
  }
}
