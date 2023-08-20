import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MasterModule } from './master/master.module';
import { TransaksiModule } from './transaksi/transaksi.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FilemanagerModule } from './filemanager/filemanager.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'upload', 'document'),
    }),
    UsersModule,
    MasterModule,
    TransaksiModule,
    FilemanagerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
