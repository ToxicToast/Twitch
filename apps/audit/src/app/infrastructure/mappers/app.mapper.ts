import { Injectable } from '@nestjs/common';
import { BaseMapper } from '@twitch/shared';
import { AppDomain } from '../../domain/aggregates/app.domain';
import { AppEntity } from '../entities/app.entity';
import { AppFactory } from '../../domain/factories/app.factory';

@Injectable()
export class AppMapper implements BaseMapper<AppDomain, AppEntity> {

  constructor(private readonly factory: AppFactory) {}

  domainToEntity(domain: AppDomain): AppEntity {
    const { id, channel, username, type, payload, created_at, updated_at, deleted_at } = domain.toAnemic();
    const entity = new AppEntity();
    entity.id = id;
    entity.channel = channel;
    entity.username = username;
    entity.type = type;
    entity.payload = payload;
    entity.created_at = created_at;
    entity.updated_at = updated_at;
    entity.deleted_at = deleted_at;
    return entity;
  }

  entityToDomain(entity: AppEntity): AppDomain {
    const { id, channel, username, type, payload, created_at, updated_at, deleted_at } = entity;
    return this.factory.reconstitute({ id, channel, username, type, payload, created_at, updated_at, deleted_at, isUpdated: !!updated_at, isDeleted: !!deleted_at });
  }


}
