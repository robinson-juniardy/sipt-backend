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
    HasMany,
  } from 'sequelize-typescript';
import { FileManagerDetail } from './filemanagerdetail.entity';

  @Table
  export class FileManager extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    folder_id: number

    @Unique
    @Column(DataType.STRING(200))
    folder_name: string

    @Column
    tree_level: number

    @Column
    parent_id: number

    @HasMany(() => FileManagerDetail)
    files_dir: FileManagerDetail[]

    @CreatedAt
    created_at: Date

    @UpdatedAt
    updated_at?: Date

  }