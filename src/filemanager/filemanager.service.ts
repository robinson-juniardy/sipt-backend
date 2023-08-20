import { Injectable, Inject } from '@nestjs/common';
import { FileManager } from 'src/database/entities/filemanager.entity';
import { FileManagerDetail } from 'src/database/entities/filemanagerdetail.entity';
import { CreateFolderDto, UploadFileDto } from './filemanager.dto';

@Injectable()
export class FilemanagerService {
    constructor(
        @Inject('FILEMANAGER_REPOSITORY') private fileManager: typeof FileManager,
        @Inject('FILEMANAGER_DETAIL_REPOSITORY') private fileManagerDetail: typeof FileManagerDetail
    ){}

    async GetFolder(): Promise<FileManager[]> {
        return this.fileManager.findAll()
    }

    async GetFolderByLevel(level: number): Promise<FileManager[]> {
        return this.fileManager.findAll({
            where: {
                tree_level: +level
            },
            include: {
                all: true
            }
        })
    }

    async GetFolderById(id: number): Promise<FileManagerDetail[]> {
        return this.fileManagerDetail.findAll({
            where: {
                folder_id: id
            },
            include: {
                all: true
            }
        })
    }

    async UploadFileEkita(params: UploadFileDto){
        return this.fileManagerDetail.create({
            filename: params.filename,
            folder_id: params.folder_id,
            title: params.title
        })
    }

    async RemoveFolder(params: {folder_id: number}){
        this.fileManager.destroy({
            where: {
                parent_id: params.folder_id
            }
        })
        return this.fileManager.destroy({
            where: {
                folder_id: params.folder_id
            }
        })
    }

    async RemoveFile(params: {file_id: number}){
        return this.fileManagerDetail.destroy({
            where: {
                file_id: params.file_id
            }
        })
    }

    async CreateFolder(params: CreateFolderDto){
        return this.fileManager.create({
            folder_name: params.folder_name,
            tree_level: params.tree_level,
            parent_id: params.parent_id
        })
    }
}
