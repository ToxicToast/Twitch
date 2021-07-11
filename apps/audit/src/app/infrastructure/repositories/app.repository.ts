import { EntityRepository, getRepository } from 'typeorm';
import { AppEntity } from '../entities/app.entity';
import { BaseRepository, Nullable } from '@twitch/shared';
import { AppDomain } from '../../domain/aggregates/app.domain';
import { AppMapper } from '../mappers/app.mapper';

@EntityRepository(AppEntity)
export class AppRepository implements BaseRepository<AppDomain> {

  constructor(private readonly mapper: AppMapper) {}

  async save(domain: AppDomain): Promise<void> {
    const entity = this.mapper.domainToEntity(domain);
    await getRepository(AppEntity).save(entity);
  }

}
