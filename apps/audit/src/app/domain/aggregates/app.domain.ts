import { AggregateRoot } from '@nestjs/cqrs';
import { Nullable } from '@twitch/shared';
import { AnemicApp } from '../models/app.model';

export class AppDomain extends AggregateRoot {

  constructor(
    private readonly id: string,
    private readonly channel: string,
    private readonly username: string,
    private readonly type: string,
    private readonly payload: string,
    private readonly created_at: Date,
    private updated_at: Nullable<Date>,
    private deleted_at: Nullable<Date>,
  ) {
    super();
  }

  public isDeleted(): boolean {
    return !!this.deleted_at;
  }

  public isUpdated(): boolean {
    return !!this.updated_at;
  }

  public toAnemic(): AnemicApp {
    return {
      id: this.id,
      channel: this.channel,
      username: this.username,
      type: this.type,
      payload: this.payload,
      created_at: this.created_at,
      updated_at: this.updated_at,
      deleted_at: this.deleted_at,
      isUpdated: this.isUpdated(),
      isDeleted: this.isDeleted(),
    }
  }

  public deleteAudit(): void {
    if (!this.isDeleted()) {
      this.deleted_at = new Date();
    }
  }

  public restoreAudit(): void {
    if (this.isDeleted()) {
      this.deleted_at = null;
    }
  }
}
