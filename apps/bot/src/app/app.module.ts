import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';
import { CqrsModule } from '@nestjs/cqrs';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { JoinEventHandler, PartEventHandler, MessageEventHandler } from './events/handlers';
import { WebsocketSagas } from './sagas/websocket.sagas';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.register([]),
    CqrsModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
    WebsocketSagas,
    JoinEventHandler,
    PartEventHandler,
    MessageEventHandler,
    {
      provide: 'BOT_SERVICE',
      useFactory: (configService: ConfigService) => {
        const user = configService.get<string>('RABBITMQ_USER');
        const password = configService.get<string>('RABBITMQ_PASSWORD');
        const host = configService.get<string>('RABBITMQ_HOST');
        const queueName = configService.get<string>('RABBITMQ_QUEUE_NAME');
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${user}:${password}@${host}`],
            queue: queueName,
            queueOptions: {
              durable: false,
            }
          }
        })
      },
      inject: [ConfigService]
    }
  ],
})
export class AppModule {}
