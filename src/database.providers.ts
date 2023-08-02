import { Sequelize } from 'sequelize-typescript';
import { Role, Users } from './database/entities/users.entity';
import {
  MasterGolongan,
  MasterJabatan,
  MasterPangkat,
  MasterPegawai,
} from './database/entities/master.entity';
import { TransCuti } from './database/entities/transaksi.entity';
import { DetailCuti } from './database/entities/detail.entity';
import { TransEkita } from './database/entities/ekita.entity';
export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: '103.123.62.41',
        port: 3306,
        username: 'sipitamy_admin',
        password: '1nd0n3s1aA',
        database: 'sipitamy_sipt',
      });
      sequelize.addModels([
        Users,
        Role,
        MasterGolongan,
        MasterJabatan,
        MasterPegawai,
        MasterPangkat,
        TransCuti,
        DetailCuti,
        TransEkita,
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
