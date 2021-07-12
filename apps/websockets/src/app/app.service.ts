import { Injectable, Logger, Scope } from '@nestjs/common';
import { Server } from 'ws';

@Injectable({ scope: Scope.DEFAULT })
export class AppService {
  private readonly logger: Logger = new Logger(AppService.name);
  public socket: Server = null;
  public clients: any[] = [];

  public broadcast(payload: string): void {
    this.clients.forEach((client: any) => {
      client.send(payload);
    })
  }
}
