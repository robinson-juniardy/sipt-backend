import { Controller, Get, Query, Param, Post, Body, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator } from '@nestjs/common';
import { FilemanagerService } from './filemanager.service';
var arrayToTree = require('array-to-tree')
import { CreateFolderDto } from './filemanager.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path, { extname } from 'path';

@Controller('filemanager')
export class FilemanagerController {
  constructor(private readonly filemanagerService: FilemanagerService) {}

  @Get()
  async GetFolders(){
    const result = await this.filemanagerService.GetFolder().then((data) => data).catch(error => error)

    // console.log(result)
    
    

    let array_tree : Array<{
      folder_id: number,
      folder_name: string,
      parent_id: number,
      tree_level: number
    }> = []

    for(let data of result){
      array_tree.push({
        folder_id: data.folder_id,
        folder_name: data.folder_name,
        parent_id: data.parent_id,
        tree_level: data.tree_level
      })
    }

    const arr = arrayToTree(array_tree, {
      customID: 'folder_id'
    })


    return arr
  }

  @Get("level/:level")
  async GetFoldersByLevel(@Param('level') level: number){
    return this.filemanagerService.GetFolderByLevel(level).then(data => data)
  }

  @Get("id/:id")
  async GetFileByFolderId(@Param('id') id: number){
    return this.filemanagerService.GetFolderById(id).then(data => data)
  }

  @Post()
  async CreateFolder(@Body() req: CreateFolderDto){
      return this.filemanagerService.CreateFolder(req).then(data => data).catch(error => error)
  }

  @Post('folder/remove')
  async RemoveFolder(@Body() req: {folder_id: number}){
    return this.filemanagerService.RemoveFolder(req).then(data => data).catch(error => error)
  }

  @Post('file/remove')
  async RemoveFile(@Body() req: {file_id: number}){
    return this.filemanagerService.RemoveFile(req).then(data => data).catch(error => error)
  }

  @Post('/ekita-bulanan/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: __dirname + '/../../upload/document',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async UploadEkita(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: 'application/pdf',
          }),
        ],
      }),
    ) file: Express.Multer.File, @Body() params: {folder_id: number}
  ){
    return this.filemanagerService.UploadFileEkita({
      filename: file.filename,
      folder_id: params.folder_id,
      title: file.originalname
    }).then(data => data).catch(error => error)
  }
}
