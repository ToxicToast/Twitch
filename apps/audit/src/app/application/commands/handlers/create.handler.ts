import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { v4 as uuidv4 } from 'uuid';
import { CreateCommand } from '../impl/create.command';
import { Logger } from '@nestjs/common';
import { AppFactory } from '../../../domain/factories/app.factory';
import { AppRepository } from '../../../infrastructure/repositories/app.repository';

@CommandHandler(CreateCommand)
export class CreateHandler implements ICommandHandler<CreateCommand> {

  private readonly logger: Logger = new Logger(CreateHandler.name);

  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly factory: AppFactory,
    private readonly repository: AppRepository,
  ) { }

  async execute(command: CreateCommand): Promise<void> {
    const { channel, username, type, payload } = command;
    const id = uuidv4();
    const model = this.eventPublisher.mergeObjectContext(
      this.factory.createFactory({ id, channel, username, type, payload })
    );
    model.commit();
    await this.repository.save(model);
  }

}
