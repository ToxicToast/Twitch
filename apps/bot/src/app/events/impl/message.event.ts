import { IEvent } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

export class MessageEvent implements IEvent {

  private readonly logger: Logger = new Logger(MessageEvent.name)

  constructor(
    public readonly proxy: ClientProxy,
    public readonly channel: string,
    public readonly username: string,
    public readonly message: string,
    public readonly type: 'message',
  ) {
    this.logger.debug({ channel, username, message, type });
  }

}
