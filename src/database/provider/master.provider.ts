import * as master from '../entities/master.entity';

export const masterProvider = [
  {
    provide: 'MASTER_PEGAWAI_REPOSITORY',
    useValue: master.MasterPegawai,
  },
  {
    provide: 'MASTER_JABATAN_REPOSITORY',
    useValue: master.MasterJabatan,
  },
  {
    provide: 'MASTER_GOLONGAN_REPOSITORY',
    useValue: master.MasterGolongan,
  },
  {
    provide: 'MASTER_PANGKAT_REPOSITORY',
    useValue: master.MasterPangkat,
  },
];
