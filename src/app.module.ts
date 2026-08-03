import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FormationModule } from './formation/formation.module';
import { CohorteModule } from './cohorte/cohorte.module';

import { User } from './users/entities/user.entity';
import { Cohorte } from './cohorte/entities/cohorte.entity';
import { Formation } from './formation/entities/formation.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Cohorte, Formation],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    FormationModule,
    CohorteModule,
  ],
})
export class AppModule {}
