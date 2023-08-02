import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { MasterService } from './master.service';
import { CreatePegawaiDto, UpdatePegawaiDto } from './master.dto';

@Controller('master')
export class MasterController {
  constructor(private readonly masterService: MasterService) {}

  @Get('/pegawai')
  async Get_Pegawai() {
    return await this.masterService.GetAllPegawai().then((data) => data);
  }

  @Get('/pegawai/:jabatan')
  async Get_Pegawai_By_Jabatan(@Param('jabatan') params: string) {
    return await this.masterService
      .GetPegawaiByJabatan(params)
      .then((data) => data);
  }

  @Get('/pegawai/jabatan/:jabatan')
  async Get_Pegawai_By_Jabatan2(@Param('jabatan') params: number) {
    return await this.masterService
      .GetPegawaiByJabatan2(params)
      .then((data) => data);
  }

  @Get('/pegawai/nip/:nip')
  async Get_PegawaiDetail(@Param('nip') nip: string) {
    return await this.masterService.GetPegawaiByNip(nip).then((data) => data);
  }

  @Post('/pegawai/add')
  async Create_Pegawai(@Body() body: CreatePegawaiDto) {
    return await this.masterService.CreatePegawai(body).then((data) => data);
  }

  @Patch('/pegawai/update')
  async Update_Pegawai(@Body() body: UpdatePegawaiDto) {
    return await this.masterService.UpdatePegawai(body).then((data) => data);
  }

  @Post('/pegawai/delete')
  async Delete_Pegawai(@Body() body: { nip: string }) {
    return await this.masterService
      .DeletePegawai(body.nip)
      .then((data) => data);
  }

  @Get('/jabatan')
  async Get_MasterJabatan() {
    return await this.masterService.GetJabatan().then((data) => data);
  }

  @Get('/golongan')
  async Get_MasterGolongan() {
    return await this.masterService.GetGolongan().then((data) => data);
  }

  @Get('/pangkat')
  async Get_MasterPangkat() {
    return await this.masterService.GetPangkat().then((data) => data);
  }

  @Get('/jabatan/:id_jabatan')
  async Get_MasterJabatanById(@Param('id_jabatan') params: number) {
    return await this.masterService.GetJabatanById(params).then((data) => data);
  }

  @Get('/golongan/:id_golongan')
  async Get_MasterGolonganById(@Param('id_golongan') params: number) {
    return await this.masterService
      .GetGolonganById(params)
      .then((data) => data);
  }

  @Get('/pangkat/:id_pangkat')
  async Get_MasterPangkatById(@Param('id_pangkat') params: number) {
    return await this.masterService.GetPangkatById(params).then((data) => data);
  }
}
