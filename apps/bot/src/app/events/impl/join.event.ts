import { IEvent } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

export class JoinEvent implements IEvent {

  private readonly logger: Logger = new Logger(JoinEvent.name)

  constructor(
    public readonly proxy: ClientProxy,
    public readonly channel: string,
    public readonly username: string,
    public readonly type: 'join',
  ) { }

}
