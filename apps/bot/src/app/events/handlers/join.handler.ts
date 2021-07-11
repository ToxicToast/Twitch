import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { JoinEvent } from '../impl';
import { Logger } from '@nestjs/common';
import { EventPatterns } from '@twitch/shared';

@EventsHandler(JoinEvent)
export class JoinEventHandler implements IEventHandler<JoinEvent> {
  private readonly logger: Logger = new Logger(JoinEventHandler.name);

  handle(event: JoinEvent): void {
    const { proxy, channel, username } = event;
    const pattern: EventPatterns = 'twitch-join-event';
    proxy.emit(pattern, { channel, username });
    this.logger.log({ pattern, channel, username })
  }
}
