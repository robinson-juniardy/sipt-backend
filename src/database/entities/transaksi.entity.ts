import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  AutoIncrement,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { MasterPegawai } from './master.entity';
import { DetailCuti } from './detail.entity';

@Table({
  modelName: 'trans_cuti',
})
export class TransCuti extends Model {
  @PrimaryKey
  @Column
  id_cuti: number;

  @HasMany(() => DetailCuti)
  timeline: DetailCuti[];

  @ForeignKey(() => MasterPegawai)
  @Column
  id_pegawai: string;

  @BelongsTo(() => MasterPegawai)
  pegawai: MasterPegawai;

  @Column
  jenis_cuti: string;

  @Column
  alasan_pengajuan_cuti?: string;

  @Column
  durasi: number;

  @Column
  tgl_mulai: Date;

  @Column
  tgl_selesai: Date;

  @Column
  alamat_selama_cuti: string;

  @Column
  status_dokumen: number;

  @Column
  hasil_approval: number;

  @Column
  filename: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt?: Date;
}
