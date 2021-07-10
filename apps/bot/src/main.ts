/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const user = process.env.RABBITMQ_USER;
  const password = process.env.RABBITMQ_PASSWORD;
  const host = process.env.RABBITMQ_HOST;
  const queueName = process.env.RABBITMQ_QUEUE_NAME;
  //
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${user}:${password}@${host}`],
      queue: queueName,
      queueOptions: {
        durable: false,
      }
    }
  });
  await app.listen(() => Logger.log('Bot Service is listening'));
}

bootstrap();
