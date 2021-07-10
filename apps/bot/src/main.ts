/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  //
  const port = configService.get<number>('APP_PORT', 3333);
  const user = configService.get<string>('RABBITMQ_USER');
  const password = configService.get<string>('RABBITMQ_PASSWORD');
  const host = configService.get<string>('RABBITMQ_HOST');
  const queueName = configService.get<string>('RABBITMQ_QUEUE_NAME');
  //
  app.enableShutdownHooks();
  //
  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${user}:${password}@${host}`],
      queue: queueName,
      queueOptions: {
        durable: true,
      },
    }
  });
  app.startAllMicroservices();
  //
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port);
  });
}

bootstrap();
