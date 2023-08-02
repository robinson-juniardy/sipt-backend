import { Injectable, Inject } from '@nestjs/common';
import {
  MasterGolongan,
  MasterJabatan,
  MasterPangkat,
  MasterPegawai,
} from 'src/database/entities/master.entity';
import { CreatePegawaiDto, UpdatePegawaiDto } from './master.dto';
import { Op } from 'sequelize';

@Injectable()
export class MasterService {
  constructor(
    @Inject('MASTER_PEGAWAI_REPOSITORY')
    private masterPegawaiRepo: typeof MasterPegawai,
    @Inject('MASTER_GOLONGAN_REPOSITORY')
    private masterGolonganRepo: typeof MasterGolongan,
    @Inject('MASTER_JABATAN_REPOSITORY')
    private masterJabatanRepo: typeof MasterJabatan,
    @Inject('MASTER_PANGKAT_REPOSITORY')
    private masterPangkatRepo: typeof MasterPangkat,
  ) {}

  async GetAllPegawai(): Promise<MasterPegawai[]> {
    return this.masterPegawaiRepo.findAll<MasterPegawai>({
      include: {
        all: true,
      },
      order: [['id_pegawai', 'desc']],
    });
  }

  async GetPegawaiByNip(nip: string): Promise<MasterPegawai> {
    return this.masterPegawaiRepo.findOne<MasterPegawai>({
      where: {
        nip: nip,
      },
      include: {
        all: true,
      },
    });
  }
  async GetPegawaiByJabatan(params: string): Promise<MasterPegawai[]> {
    return this.masterPegawaiRepo.findAll<MasterPegawai>({
      where: {
        jabatan: {
          [Op.in]: [
            `SELECT id_jabatan FROM master_jabatans WHERE nama_jabatan LIKE '%'${params}'%'`,
          ],
        },
      },
    });
  }

  async GetPegawaiByJabatan2(params: number): Promise<MasterPegawai> {
    return this.masterPegawaiRepo.findOne<MasterPegawai>({
      where: {
        jabatan: params,
      },
    });
  }

  async CreatePegawai(dto: CreatePegawaiDto) {
    return this.masterPegawaiRepo.create({
      nip: dto.nip,
      nama: dto.nama,
      pangkat: dto.pangkat,
      jabatan: dto.jabatan,
      golongan: dto.golongan,
      atasan_langsung: dto.atasan_langsung,
    });
  }

  async UpdatePegawai(dto: UpdatePegawaiDto) {
    console.log(dto);

    return this.masterPegawaiRepo.update(
      {
        nip: dto.nip,
        nama: dto.nama,
        pangkat: dto.pangkat,
        jabatan: dto.jabatan,
        golongan: dto.golongan,
        atasan_langsung: dto.atasan_langsung,
      },
      {
        where: {
          id_pegawai: dto.id_pegawai,
        },
      },
    );
  }

  async DeletePegawai(nip: string) {
    return this.masterPegawaiRepo.destroy({
      where: {
        nip: nip,
      },
    });
  }

  async GetJabatan(): Promise<MasterJabatan[]> {
    return this.masterJabatanRepo.findAll<MasterJabatan>();
  }
  async GetJabatanById(param: number): Promise<MasterJabatan> {
    return this.masterJabatanRepo.findOne<MasterJabatan>({
      where: {
        id_jabatan: param,
      },
    });
  }

  async GetPangkat(): Promise<MasterPangkat[]> {
    return this.masterPangkatRepo.findAll<MasterPangkat>();
  }

  async GetPangkatById(param: number): Promise<MasterPangkat> {
    return this.masterPangkatRepo.findOne<MasterPangkat>({
      where: {
        id_pangkat: param,
      },
    });
  }

  async GetGolongan(): Promise<MasterGolongan[]> {
    return this.masterGolonganRepo.findAll<MasterGolongan>();
  }

  async GetGolonganById(param: number): Promise<MasterGolongan> {
    return this.masterGolonganRepo.findOne<MasterGolongan>({
      where: {
        id_golongan: param,
      },
    });
  }
}
