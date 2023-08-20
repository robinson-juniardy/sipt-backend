import {
    Table,
    Column,
    Model,
    CreatedAt,
    UpdatedAt,
    ForeignKey,
    BelongsTo,
    PrimaryKey,
    AutoIncrement,
    DataType,
    Unique,
  } from 'sequelize-typescript';
import { FileManager } from './filemanager.entity';

  @Table
  export class FileManagerDetail extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    file_id: number

    @Unique
    @Column(DataType.STRING(255))
    filename: string

    @Column(DataType.STRING(255))
    title: string

    @ForeignKey(() => FileManager)
    @Column
    folder_id: number

    @BelongsTo(() => FileManager)
    folder: FileManager

  }