import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { HandlePartDTO } from '../../../audit/src/app/interface/dtos/app.dto';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly logger: Logger = new Logger(AppController.name);

  constructor(private readonly socketService: AppService) {}


  @MessagePattern('twitch-join-socket')
  async handleJoin(@Payload() payload: any, @Ctx() context: RmqContext): Promise<void> {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    //
    channel.ack(originalMsg);
    //
    Logger.log(payload);
    this.socketService.broadcast(JSON.stringify({...payload, type: 'join'}));
  }

  @MessagePattern('twitch-part-socket')
  async handlePart(@Payload() payload: any, @Ctx() context: RmqContext): Promise<void> {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    //
    channel.ack(originalMsg);
    //
    Logger.log(payload);
    this.socketService.broadcast(JSON.stringify({...payload, type: 'part'}));
  }

  @MessagePattern('twitch-message-socket')
  async handleMessage(@Payload() payload: any, @Ctx() context: RmqContext): Promise<void> {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    //
    channel.ack(originalMsg);
    //
    Logger.log(payload);
    this.socketService.broadcast(JSON.stringify({...payload, type: 'message'}));
  }
}
