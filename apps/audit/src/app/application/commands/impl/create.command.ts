import { ICommand } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

export class CreateCommand implements ICommand {
  private readonly logger: Logger = new Logger(CreateCommand.name);

  constructor(
    public readonly channel: string,
    public readonly username: string,
    public readonly type: string,
    public readonly payload: string,
  ) { }
}
