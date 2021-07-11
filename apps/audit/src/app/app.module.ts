import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './interface/controllers/app.controller';
import { CreateHandler } from './application/commands/handlers/create.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { AppFactory } from './domain/factories/app.factory';
import { AppRepository } from './infrastructure/repositories/app.repository';
import { AppMapper } from './infrastructure/mappers/app.mapper';
import { AppEntity } from './infrastructure/entities/app.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

const host = process.env.DATABASE_HOST;
const port = Number(process.env.DATABASE_PORT);
const username = process.env.DATABASE_USERNAME;
const password = process.env.DATABASE_PASSWORD;

@Module({
  imports: [
    ConfigModule,
    CqrsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host,
      port,
      username: 'audit',
      password,
      database: 'thoraxia',
      entities: [
        AppEntity
      ],
      synchronize: true,
      retryAttempts: 3,
      retryDelay: 1000,
    }),
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppFactory,
    AppMapper,
    AppRepository,
    CreateHandler,
  ],
})
export class AppModule {}
