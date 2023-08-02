import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  FileTypeValidator,
} from '@nestjs/common';
import { TransaksiService } from './transaksi.service';
import {
  CreateCutiDto,
  UpdateStatusCutiDto,
  UploadEkitaDto,
} from './transaksi.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path, { extname } from 'path';

@Controller('transaksi')
export class TransaksiController {
  constructor(private readonly transaksiService: TransaksiService) {}

  @Get('/pengajuan-cuti')
  async GetPengajuanCuti() {
    return await this.transaksiService.GetAllCuti().then((data) => data);
  }

  @Get('/pengajuan-cuti/:id_pegawai')
  async GetPengajuanCutiByIdPegawai(@Param('id_pegawai') id_pegawai: number) {
    return this.transaksiService
      .GetCutiByPegawai(id_pegawai)
      .then((data) => data);
  }

  @Post('/pengajuan-cuti')
  async CreatePengajuanCuti(@Body() params: CreateCutiDto) {
    console.log(params);
    return await this.transaksiService.SaveCuti(params).then((data) => data);
  }

  @Post('/pengajuan-cuti/update-status')
  async UpdateStatusCuti(@Body() params: UpdateStatusCutiDto) {
    console.log(params);
    return await this.transaksiService
      .UpdateStatusDokumenCuti(params)
      .then((data) => data);
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
    @UploadedFile() file: Express.Multer.File,
    @Body()
    params: { tahun: string; id_pegawai: number; bulan: string | number },
  ) {
    console.log(file);
    console.log(params);

    return this.transaksiService
      .UploadEkitaBulanan({
        bulan: params.bulan,
        id_pegawai: params.id_pegawai,
        tahun: params.tahun,
        filename: file.filename,
      })
      .then((data) => data);
  }

  @Post('/pengajuan-cuti/upload-pemberitaan')
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
  async UploadPemberitaan(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: 'application/pdf || image/jpg || image/png || image/jpeg',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() params: { cuti_id: number },
  ) {
    console.log(file);

    return await this.transaksiService
      .UploadFilePemberitaan({
        id_cuti: params.cuti_id,
        filename: file.filename,
      })
      .then((data) => data)
      .catch((error) => {
        console.log(error);
      });
  }

  @Get('/ekita-bulanan')
  async GetEkitaBulanan() {
    return this.transaksiService.GetEkitaBulanan().then((data) => data);
  }

  @Get('/ekita-bulanan/:id_pegawai')
  async GetEkitaBulananByIdPegawai(@Param('id_pegawai') id_pegawai: number) {
    return this.transaksiService
      .GetEkitaBulananByIdPegawai(id_pegawai)
      .then((data) => data);
  }

  @Post('/ekita-bulanan/delete')
  async DeleteEkitaBulanan(@Body() params: { ekita_id: number }) {
    return this.transaksiService.DeletEkita(params).then((data) => data);
  }
}
