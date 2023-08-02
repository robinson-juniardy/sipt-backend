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
} from 'sequelize-typescript';
import { MasterPegawai } from './master.entity';

@Table({
  modelName: 'trans_ekita',
})
export class TransEkita extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  ekita_id: number;

  @Column
  filename: string;

  @Column
  bulan: string;

  @Column
  tahun: string;

  @ForeignKey(() => MasterPegawai)
  @Column
  id_pegawai: number;

  @BelongsTo(() => MasterPegawai)
  pegawai: MasterPegawai;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt?: Date;
}
