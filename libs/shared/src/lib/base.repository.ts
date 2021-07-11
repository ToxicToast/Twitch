import { Nullable } from './base.types';

export interface BaseRepository<T> {
  save(domain: T): Promise<void>;
  delete?(domain: T): Promise<void>;
  remove?(domain: T): Promise<void>;
  findList?(deleted?: boolean): Promise<Nullable<T[]>>;
  findById?(id: string, deleted?: boolean): Promise<Nullable<T>>;
}
