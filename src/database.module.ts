import { Module } from '@nestjs/common';
import { databaseProviders, localDatabaseProviders } from './database.providers';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
