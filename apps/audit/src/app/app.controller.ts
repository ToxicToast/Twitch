import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class AppController {
  private readonly logger: Logger = new Logger(AppController.name);

  @EventPattern('twitch-join-audit')
  async handleJoin(data: any): Promise<void> {
    Logger.log(data);
  }

  @EventPattern('twitch-part-audit')
  async handlePart(data: any): Promise<void> {
    Logger.log(data);
  }

  @EventPattern('twitch-message-audit')
  async handleMessage(data: any): Promise<void> {
    Logger.log(data);
  }
}
