import { Nullable } from './base.types';

export interface BaseRepository<T> {
  save(domain: T): Promise<void>;
  delete(domtain: T): Promise<void>;
  remove(domtain: T): Promise<void>;
  findList(deleted?: boolean): Promise<Nullable<T[]>>;
  findById(id: string, deleted?: boolean): Promise<Nullable<T>>;
}
