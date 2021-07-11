import { Controller, Inject, Logger, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';
import { EventBus } from '@nestjs/cqrs';
import { JoinEvent, MessageEvent, PartEvent } from './events/impl';

@Controller()
export class AppController implements OnApplicationBootstrap, OnApplicationShutdown {
  private readonly logger: Logger = new Logger(AppController.name);

  constructor(
    @Inject('BOT_SERVICE')
    private readonly proxy: ClientProxy,
    private readonly service: AppService,
    private readonly eventBus: EventBus,
  ) {
    this.service.init();
    this.onBotEvents();
  }

  async onApplicationBootstrap(): Promise<void> {
    this.logger.debug('Bot is starting...');
    this.service.connect();
    await this.proxy.connect();
  }

  async onApplicationShutdown(signal?: string): Promise<void> {
    this.logger.debug(signal);
    this.logger.debug('Bot is shutting down...');
    this.service.disconnect();
    await this.proxy.close();
  }

  private onBotEvents(): void {
    this.onJoin();
    this.onPart();
    this.onMessage();
  }

  private onJoin(): void {
    this.service.instance.onJoin((channel: string, username: string) => {
      this.eventBus.publish(new JoinEvent(this.proxy, channel, username, 'join'));
    });
  }

  private onPart(): void {
    this.service.instance.onPart((channel: string, username: string) => {
      this.eventBus.publish(new PartEvent(this.proxy, channel, username, 'part'));
    });
  }

  private onMessage(): void {
    this.service.instance.onMessage((channel: string, username: string, message: string) => {
      this.eventBus.publish(new MessageEvent(this.proxy, channel, username, message, 'message'));
    });
  }

}
