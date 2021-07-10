import { Controller, Logger } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class AppController {
  private readonly logger: Logger = new Logger(AppController.name);

  @MessagePattern('twitch-join-sockets')
  async handleJoin(@Payload() payload: any, @Ctx() context: RmqContext): Promise<void> {
    Logger.log(payload);
  }
}
