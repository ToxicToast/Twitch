import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './interface/controllers/app.controller';
import { CreateHandler } from './application/commands/handlers/create.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { AppFactory } from './domain/factories/app.factory';

@Module({
  imports: [
    ConfigModule,
    CqrsModule,
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppFactory,
    CreateHandler,
  ],
})
export class AppModule {}
