import { Module } from '@nestjs/common';
import { ApprenantsService } from './apprenants.service';
import { ApprenantsController } from './apprenants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apprenant } from './entities/apprenant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Apprenant])],
  controllers: [ApprenantsController],
  providers: [ApprenantsService],
})
export class ApprenantsModule {}
