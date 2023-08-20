import { IsNotEmpty } from "class-validator";

export class CreateFolderDto {
    @IsNotEmpty()
    folder_name: string

    parent_id: number

    tree_level: number
}

export class UploadFileDto {
    @IsNotEmpty()
    filename: string

    folder_id: number

    title: string
}