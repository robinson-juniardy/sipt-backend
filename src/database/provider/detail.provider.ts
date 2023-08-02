import { DetailCuti } from '../entities/detail.entity';

export const detailTransaksiProvider = [
  {
    provide: 'TRANS_CUTI_DETAIL_REPOSITORY',
    useValue: DetailCuti,
  },
];
