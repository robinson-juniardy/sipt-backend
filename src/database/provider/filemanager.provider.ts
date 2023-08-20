import { FileManager } from "../entities/filemanager.entity";
import { FileManagerDetail } from "../entities/filemanagerdetail.entity";

export const fileManagerProvider = [
    {
        provide: 'FILEMANAGER_REPOSITORY',
        useValue: FileManager,
    },
    {
        provide: 'FILEMANAGER_DETAIL_REPOSITORY',
        useValue: FileManagerDetail,
    },
  ];