import { Injectable, Logger } from '@nestjs/common';
import { ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { JoinEvent, MessageEvent, PartEvent } from '../events/impl';
import { AuditPatterns, SocketPatterns } from '@twitch/shared';

@Injectable()
export class AuditSagas {

  private readonly logger: Logger = new Logger(AuditSagas.name);

  @Saga()
  auditJoin = (events$: Observable<any>): Observable<void> => {
    return events$.pipe(
      ofType(JoinEvent),
      map((event) => {
        const { proxy, channel, username } = event;
        const pattern: AuditPatterns = 'twitch-join-audit';
        proxy.send(pattern, { channel, username }).toPromise().catch(error => this.logger.error(error));
        this.logger.log({ pattern, channel, username });
      })
    );
  }

  @Saga()
  auditPart = (events$: Observable<any>): Observable<void> => {
    return events$.pipe(
      ofType(PartEvent),
      map((event) => {
        const { proxy, channel, username } = event;
        const pattern: AuditPatterns = 'twitch-part-audit';
        proxy.send(pattern, { channel, username }).toPromise().catch(error => this.logger.error(error));
        this.logger.log({ pattern, channel, username });
      })
    );
  }

  @Saga()
  auditMessage = (events$: Observable<any>): Observable<void> => {
    return events$.pipe(
      ofType(MessageEvent),
      map((event) => {
        const { proxy, channel, username, message } = event;
        const pattern: AuditPatterns = 'twitch-message-audit';
        proxy.send(pattern, { channel, username, message }).toPromise().catch(error => this.logger.error(error));
        this.logger.log({ pattern, channel, username, message });
      })
    );
  }
}
