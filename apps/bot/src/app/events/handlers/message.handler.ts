import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { MessageEvent } from '../impl';
import { Logger } from '@nestjs/common';
import { EventPatterns } from '@twitch/shared';

@EventsHandler(MessageEvent)
export class MessageEventHandler implements IEventHandler<MessageEvent> {
  private readonly logger: Logger = new Logger(MessageEventHandler.name);

  handle(event: MessageEvent): void {
    const { proxy, channel, username, message } = event;
    const pattern: EventPatterns = 'twitch-message-event';
    proxy.emit(pattern, { channel, username, message });
    this.logger.log({ pattern, channel, username, message })
  }
}
