import { Injectable, Logger } from '@nestjs/common';
import { environment } from '../environments/environment';
import { AccessToken, RefreshableAuthProvider, StaticAuthProvider } from 'twitch-auth';
import { ChatClient } from 'twitch-chat-client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  private readonly logger: Logger = new Logger(AppService.name);
  private readonly twitchId: string;
  private readonly twitchSecret: string;
  private twitchAccessToken: string;
  private readonly twitchRefreshToken;
  private readonly twitchChannels: string[];
  private botProvider: RefreshableAuthProvider;
  private botClient: ChatClient;

  constructor(private readonly configService: ConfigService) {
    this.twitchId = configService.get<string>('TWITCH_ID', '');
    this.twitchSecret = configService.get<string>('TWITCH_SECRET', '');
    this.twitchAccessToken = configService.get<string>('TWITCH_ACCESS_TOKEN', '');
    this.twitchRefreshToken = configService.get<string>('TWITCH_REFRESH_TOKEN', '');
    this.twitchChannels = configService.get<string>('TWITCH_CHANNELS', '#toxictoast').split(',');
  }

  private setProvider(authProvider: RefreshableAuthProvider) {
    this.botProvider = authProvider;
  }

  private setInstance(chatClient: ChatClient) {
    this.botClient = chatClient;
  }

  public init(): void {
    const provider = new RefreshableAuthProvider(
      new StaticAuthProvider(
        this.twitchId,
        this.twitchAccessToken,
      ),
      {
        clientSecret: this.twitchSecret,
        refreshToken: this.twitchRefreshToken,
        onRefresh: (token: AccessToken) => {
          this.twitchAccessToken = token.accessToken;
          this.logger.debug(this.twitchAccessToken);
        }
      }
    );
    this.setProvider(provider);
    //
    const client = new ChatClient(provider, {
      channels: this.twitchChannels,
      requestMembershipEvents: true
    });
    this.setInstance(client);
  }

  public connect(): void {
    this.botClient.connect().catch(error => this.logger.error(error)).then(() => this.logger.debug('Bot connected...'));
  }

  public disconnect(): void {
    this.botClient.quit().catch(error => this.logger.error(error)).then(() => this.logger.debug('Bot disconnected...'));
  }

  get instance(): ChatClient {
    return this.botClient;
  }
}
