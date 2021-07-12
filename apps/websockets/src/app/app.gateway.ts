import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server } from 'ws';
import { AppService } from './app.service';

@WebSocketGateway(4444)
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  private readonly logger: Logger = new Logger(AppGateway.name);
  private clients: any[] = [];
  @WebSocketServer() server: Server;

  constructor(private readonly socketService: AppService) {}

  afterInit(server: Server): void {
    this.logger.log('Socket open...');
  }

  handleConnection(client: any, ...args): void {
    this.clients.push(client);
    this.socketService.clients.push(client);
    this.logger.log('New Connection');
  }

  handleDisconnect(client: any): void {
    this.logger.log('Client Disconnected');
    for (let i = 0; i < this.clients.length; i++) {
      if (this.clients[i] === client) {
        this.clients.splice(i, 1);
        this.socketService.clients.splice(i, 1);
        break;
      }
    }
  }


}
