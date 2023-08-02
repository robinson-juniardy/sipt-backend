import { TransCuti } from '../entities/transaksi.entity';

export const transaksiProvider = [
  {
    provide: 'TRANS_CUTI_REPOSITORY',
    useValue: TransCuti,
  },
];
