import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { HandlePartDTO } from '../../../audit/src/app/interface/dtos/app.dto';

@Controller()
export class AppController {
  private readonly logger: Logger = new Logger(AppController.name);


  @MessagePattern('twitch-join-socket')
  async handleJoin(data: any): Promise<void> {
    Logger.log(data);
  }

  @MessagePattern('twitch-part-socket')
  async handlePart(@Payload() payload: any, @Ctx() context: RmqContext): Promise<void> {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    //
    channel.ack(originalMsg);
    //
    Logger.log(payload);
  }

  @MessagePattern('twitch-message-socket')
  async handleMessage(@Payload() payload: any, @Ctx() context: RmqContext): Promise<void> {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    //
    channel.ack(originalMsg);
    //
    Logger.log(payload);
  }
}
