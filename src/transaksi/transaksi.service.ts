import { Injectable, Inject } from '@nestjs/common';
import { TransCuti } from 'src/database/entities/transaksi.entity';
import {
  CreateCutiDto,
  UpdateStatusCutiDto,
  UploadEkitaDto,
} from './transaksi.dto';
import { TransEkita } from 'src/database/entities/ekita.entity';

@Injectable()
export class TransaksiService {
  constructor(
    @Inject('TRANS_CUTI_REPOSITORY') private transCutiRepo: typeof TransCuti,
    @Inject('TRANS_EKITA_REPOSITORY') private transEkitaRepo: typeof TransEkita,
  ) {}

  async GetAllCuti(): Promise<TransCuti[]> {
    return this.transCutiRepo.findAll<TransCuti>({
      include: {
        all: true,
      },
    });
  }

  async SaveCuti(params: CreateCutiDto) {
    return this.transCutiRepo.create({
      id_pegawai: params.id_pegawai,
      jenis_cuti: params.jenis_cuti,
      alasan_pengajuan_cuti: params.alasan,
      alamat_selama_cuti: params.alamat,
      durasi: params.durasi,
      tgl_mulai: new Date(params.tgl_mulai),
      tgl_selesai: params.tgl_selesai,
      status_dokumen: 0,
      hasil_approval: 0,
    });
  }

  async GetCutiByPegawai(params: number): Promise<TransCuti[]> {
    return this.transCutiRepo.findAll<TransCuti>({
      include: { all: true },
      where: {
        id_pegawai: params,
      },
    });
  }

  async UpdateStatusDokumenCuti(params: UpdateStatusCutiDto) {
    return this.transCutiRepo.update(
      {
        status_dokumen: params.status_dokumen,
      },
      {
        where: {
          id_cuti: params.id_cuti,
        },
      },
    );
  }

  async UploadFilePemberitaan(params: { id_cuti: number; filename: string }) {
    console.log(params);

    return this.transCutiRepo.update(
      {
        filename: params.filename,
      },
      {
        where: {
          id_cuti: params.id_cuti,
        },
      },
    );
  }

  async GetEkitaBulanan(): Promise<TransEkita[]> {
    return this.transEkitaRepo.findAll<TransEkita>({
      include: {
        all: true,
      },
    });
  }

  async UploadEkitaBulanan(params: UploadEkitaDto) {
    return this.transEkitaRepo.create({
      id_pegawai: params.id_pegawai,
      bulan: params.bulan,
      tahun: params.tahun,
      filename: params.filename,
    });
  }

  async GetEkitaBulananByIdPegawai(id_pegawai: number): Promise<TransEkita[]> {
    return this.transEkitaRepo.findAll<TransEkita>({
      where: {
        id_pegawai: id_pegawai,
      },
      include: {
        all: true,
      },
    });
  }

  async DeletEkita(params: { ekita_id: number }) {
    return this.transEkitaRepo.destroy({
      where: {
        ekita_id: params.ekita_id,
      },
    });
  }
}
