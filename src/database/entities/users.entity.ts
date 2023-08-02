import { DataType } from 'sequelize';
import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  Length,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { MasterPegawai } from './master.entity';

@Table({
  modelName: 'role',
})
export class Role extends Model {
  @PrimaryKey
  @Column
  role_id: number;

  @Column
  level: number;

  @Column
  role_name: string;

  @CreatedAt
  createdAt: Date;

  @Column({
    allowNull: true,
  })
  @UpdatedAt
  updatedAt: Date;
}

@Table({
  modelName: 'users',
})
export class Users extends Model {
  @Column({
    primaryKey: true,
  })
  id: number;

  @Column
  username: string;

  @ForeignKey(() => MasterPegawai)
  @Column
  id_pegawai: number;

  @BelongsTo(() => MasterPegawai)
  pegawai: MasterPegawai;

  @Column
  password: string;

  @ForeignKey(() => Role)
  @Column
  role: number;

  @BelongsTo(() => Role)
  roles: Role;

  @CreatedAt
  createdAt: Date;

  @Column({
    allowNull: true,
  })
  @UpdatedAt
  updatedAt: Date;
}
