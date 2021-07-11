import { Injectable, Logger } from '@nestjs/common';
import { ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { JoinEvent, MessageEvent, PartEvent } from '../events/impl';
import { SocketPatterns } from '@twitch/shared';

@Injectable()
export class WebsocketSagas {

  private readonly logger: Logger = new Logger(WebsocketSagas.name);

  @Saga()
  socketJoin = (events$: Observable<any>): Observable<void> => {
    return events$.pipe(
      ofType(JoinEvent),
      map((event) => {
        const { proxy, channel, username } = event;
        const pattern: SocketPatterns = 'twitch-join-socket';
        proxy.send(pattern, { channel, username }).toPromise().catch(error => this.logger.error(error));
        this.logger.log({ pattern, channel, username });
      })
    );
  }

  @Saga()
  socketPart = (events$: Observable<any>): Observable<void> => {
    return events$.pipe(
      ofType(PartEvent),
      map((event) => {
        const { proxy, channel, username } = event;
        const pattern: SocketPatterns = 'twitch-part-socket';
        proxy.send(pattern, { channel, username }).toPromise().catch(error => this.logger.error(error));
        this.logger.log({ pattern, channel, username });
      })
    );
  }

  @Saga()
  socketMessage = (events$: Observable<any>): Observable<void> => {
    return events$.pipe(
      ofType(MessageEvent),
      map((event) => {
        const { proxy, channel, username, message } = event;
        const pattern: SocketPatterns = 'twitch-message-socket';
        proxy.send(pattern, { channel, username, message }).toPromise().catch(error => this.logger.error(error));
        this.logger.log({ pattern, channel, username, message });
      })
    );
  }
}
