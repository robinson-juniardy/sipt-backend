import { Module } from '@nestjs/common';
import { TransaksiService } from './transaksi.service';
import { TransaksiController } from './transaksi.controller';
import { DatabaseModule } from '../database.module';
import { transaksiProvider } from 'src/database/provider/transaksi.provider';
import { detailTransaksiProvider } from 'src/database/provider/detail.provider';
import { ekitaProvider } from 'src/database/provider/ekita.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [TransaksiController],
  providers: [
    TransaksiService,
    ...transaksiProvider,
    ...detailTransaksiProvider,
    ...ekitaProvider,
  ],
})
export class TransaksiModule {}
