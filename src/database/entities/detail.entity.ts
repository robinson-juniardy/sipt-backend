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
import { TransCuti } from './transaksi.entity';

@Table({
  modelName: 'trans_cuti_detail',
})
export class DetailCuti extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id_detail_cuti: number;

  @ForeignKey(() => TransCuti)
  @Column
  id_cuti: number;

  @Column
  verif_level: number;

  @Column
  waktu_verif: Date;

  @CreatedAt
  createdAt?: Date;

  @UpdatedAt
  updatedAt?: Date;
}
