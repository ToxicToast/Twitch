import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { JoinEvent } from '../impl';
import { Logger } from '@nestjs/common';
import { EventPatterns } from '@twitch/shared';

@EventsHandler(JoinEvent)
export class JoinEventHandler implements IEventHandler<JoinEvent> {
  private readonly logger: Logger = new Logger(JoinEventHandler.name);

  async handle(event: JoinEvent): Promise<void> {
    const { proxy, channel, username } = event;
    const pattern: EventPatterns = 'twitch-join-event';
    // await proxy.send(pattern, { channel, username }).toPromise();
    // this.logger.log({ pattern, channel, username })
  }
}
