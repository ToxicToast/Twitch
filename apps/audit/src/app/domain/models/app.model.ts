import { Nullable } from '@twitch/shared';

export interface AnemicApp {
  readonly id: string;
  readonly channel: string;
  readonly username: string;
  readonly type: string;
  readonly payload: string;
  readonly created_at: Date;
  readonly updated_at: Nullable<Date>;
  readonly deleted_at: Nullable<Date>;
  readonly isUpdated: boolean;
  readonly isDeleted: boolean;
}

export interface CreateAudit {
  readonly id: string;
  readonly channel: string;
  readonly username: string;
  readonly type: string;
  readonly payload: string;
}
