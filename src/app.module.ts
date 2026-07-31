import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FormationModule } from './formation/formation.module';
import { CohorteModule } from './cohorte/cohorte.module';
import { ApprenantsModule } from './apprenants/apprenants.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Cohorte } from './cohorte/entities/cohorte.entity';
import { Formation } from './formation/entities/formation.entity';
import { Apprenant } from './apprenants/entities/apprenant.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'hamide',
      database: 'odc_apprenants_db',
      entities: [User, Cohorte, Formation, Apprenant],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    FormationModule,
    CohorteModule,
    ApprenantsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
