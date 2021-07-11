import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection, ConnectionOptions, createConnection, EntityTarget } from 'typeorm';

@Module({
  imports: [TypeOrmModule],
  exports: [TypeOrmModule],
})
export class DatabaseModule {
  static forRoot(name = 'DATABASE_CONNECTION', entities = [], options?: ConnectionOptions): DynamicModule {
    const databaseProviders = [
      {
        provide: name,
        useFactory: async () => await createConnection({
          ...options,
          entities,
          synchronize: true,
        }),
      },
    ];
    return {
      module: DatabaseModule,
      exports: databaseProviders,
    }
  }

  static forFeature(name: string, entity: EntityTarget<unknown>, injector = 'DATABASE_CONNECTION'): DynamicModule {
    const databaseProviders = [
      {
        provide: name,
        useFactory: (connection: Connection) => connection.getRepository(entity),
        inject: [injector],
      },
    ];
    return {
      module: DatabaseModule,
      exports: databaseProviders,
    }
  }
}
