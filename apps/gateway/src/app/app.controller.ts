import { Controller, Get, Inject, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller()
export class AppController implements OnApplicationBootstrap {
  private readonly logger: Logger = new Logger(AppController.name);

  constructor(
    @Inject('TWITCH_SERVICE')
    private readonly proxy: ClientProxy,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    this.logger.debug('Controller starts...');
    // await this.proxy.connect().catch(err => this.logger.error(err));
  }

  @Get()
  async testMessage(): Promise<any> {
    return await this.proxy.send('twitch-list-audit', { withDeleted: false, type: 'join' });
  }

}
