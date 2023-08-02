import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

@Table({
  modelName: 'master_jabatan',
})
export class MasterJabatan extends Model {
  @Column({
    primaryKey: true,
  })
  id_jabatan: number;

  @Column
  nama_jabatan: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt?: Date;
}

@Table({
  modelName: 'master_golongan',
})
export class MasterGolongan extends Model {
  @Column({
    primaryKey: true,
  })
  id_golongan: number;

  @Column
  nama_golongan: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt?: Date;
}

@Table({
  modelName: 'master_pangkat',
})
export class MasterPangkat extends Model {
  @Column({
    primaryKey: true,
  })
  id_pangkat: number;

  @Column
  nama_pangkat: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt?: Date;
}

@Table({
  modelName: 'master_pegawai',
})
export class MasterPegawai extends Model {
  @Column({
    primaryKey: true,
  })
  id_pegawai: number;

  @Column
  nip: string;

  @Column
  nama: string;

  @ForeignKey(() => MasterJabatan)
  @Column
  jabatan: number;

  @BelongsTo(() => MasterJabatan)
  jabatan_raw: MasterJabatan;

  @ForeignKey(() => MasterPangkat)
  @Column
  pangkat: number;

  @BelongsTo(() => MasterPangkat)
  pangkat_raw: MasterPangkat;

  @ForeignKey(() => MasterGolongan)
  @Column
  golongan: number;

  @BelongsTo(() => MasterGolongan)
  golongan_raw: MasterGolongan;

  @ForeignKey(() => MasterPegawai)
  @Column
  atasan_langsung: number;

  @BelongsTo(() => MasterPegawai)
  atasan: MasterPegawai;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt?: Date;
}
