import { Injectable } from '@nestjs/common';
import { BaseFactory } from '@twitch/shared';
import { AppDomain } from '../aggregates/app.domain';
import { AnemicApp, CreateAudit } from '../models/app.model';

@Injectable()
export class AppFactory implements BaseFactory<AnemicApp, AppDomain, CreateAudit> {

  constitute(domain: AppDomain): AnemicApp {
    return domain.toAnemic();
  }

  createFactory(data: CreateAudit): AppDomain {
    const { id, channel, username, type, payload } = data;
    return new AppDomain(id, channel, username, type, payload, new Date(), null, null);
  }

  reconstitute(anemic: AnemicApp): AppDomain {
    const { id, channel, username, type, payload, created_at, updated_at, deleted_at } = anemic;
    return new AppDomain(id, channel, username, type, payload, created_at, updated_at, deleted_at);
  }

}
