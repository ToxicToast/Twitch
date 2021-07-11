import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { HandleJoin, HandleMessage, HandlePart } from '../patterns/app.patterns';
import { HandleJoinDTO, HandleMessageDTO, HandlePartDTO } from '../dtos/app.dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateCommand } from '../../application/commands/impl/create.command';

@Controller()
export class AppController {
  private readonly logger: Logger = new Logger(AppController.name);

  constructor(
    private readonly commandBus: CommandBus,
  ) {}

  @MessagePattern(HandleJoin)
  async handleJoin(@Payload() payload: HandleJoinDTO, @Ctx() context: RmqContext): Promise<void> {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    //
    channel.ack(originalMsg);
    //
    return await this.commandBus.execute(new CreateCommand(payload.channel, payload.username, 'join', JSON.stringify(payload)));
  }

  @MessagePattern(HandlePart)
  async handlePart(@Payload() payload: HandlePartDTO, @Ctx() context: RmqContext): Promise<void> {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    //
    channel.ack(originalMsg);
    //
    return await this.commandBus.execute(new CreateCommand(payload.channel, payload.username, 'part', JSON.stringify(payload)));
  }

  @MessagePattern(HandleMessage)
  async handleMessage(@Payload() payload: HandleMessageDTO, @Ctx() context: RmqContext): Promise<void> {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    //
    channel.ack(originalMsg);
    //
    return await this.commandBus.execute(new CreateCommand(payload.channel, payload.username, 'message', JSON.stringify(payload)));
  }
}
