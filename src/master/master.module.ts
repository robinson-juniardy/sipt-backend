import { Module } from '@nestjs/common';
import { MasterService } from './master.service';
import { MasterController } from './master.controller';
import { DatabaseModule } from 'src/database.module';
import { masterProvider } from 'src/database/provider/master.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [MasterController],
  providers: [MasterService, ...masterProvider],
})
export class MasterModule {}
