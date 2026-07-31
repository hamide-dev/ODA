import { Module } from '@nestjs/common';
import { CohorteService } from './cohorte.service';
import { CohorteController } from './cohorte.controller';
import { Cohorte } from './entities/cohorte.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Cohorte])],
  controllers: [CohorteController],
  providers: [CohorteService],
})
export class CohorteModule {}
