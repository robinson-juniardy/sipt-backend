import { Module } from '@nestjs/common';
import { FilemanagerService } from './filemanager.service';
import { FilemanagerController } from './filemanager.controller';
import { DatabaseModule } from 'src/database.module';
import { fileManagerProvider } from 'src/database/provider/filemanager.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [FilemanagerController],
  providers: [FilemanagerService, ...fileManagerProvider]
})
export class FilemanagerModule {}
