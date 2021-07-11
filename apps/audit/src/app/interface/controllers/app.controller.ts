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

  @EventPattern(HandleJoin)
  async handleJoin(data: HandleJoinDTO): Promise<void> {
    await this.commandBus.execute(new CreateCommand(data.channel, data.username, 'join', JSON.stringify(data)));
  }

  @EventPattern(HandlePart)
  async handlePart(data: HandlePartDTO): Promise<void> {
    await this.commandBus.execute(new CreateCommand(data.channel, data.username, 'part', JSON.stringify(data)));
  }

  @EventPattern(HandleMessage)
  async handleMessage(data: HandleMessageDTO): Promise<void> {
    await this.commandBus.execute(new CreateCommand(data.channel, data.username, 'message', JSON.stringify(data)));
  }
}
