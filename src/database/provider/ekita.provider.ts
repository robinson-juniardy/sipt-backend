import { TransEkita } from '../entities/ekita.entity';

export const ekitaProvider = [
  {
    provide: 'TRANS_EKITA_REPOSITORY',
    useValue: TransEkita,
  },
];
