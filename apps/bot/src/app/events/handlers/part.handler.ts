import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PartEvent } from '../impl';
import { Logger } from '@nestjs/common';
import { EventPatterns } from '@twitch/shared';

@EventsHandler(PartEvent)
export class PartEventHandler implements IEventHandler<PartEvent> {
  private readonly logger: Logger = new Logger(PartEventHandler.name);

  async handle(event: PartEvent): Promise<void> {
    const { proxy, channel, username } = event;
    const pattern: EventPatterns = 'twitch-part-event';
    // await proxy.send(pattern, { channel, username }).toPromise();
    // this.logger.log({ pattern, channel, username })
  }
}
