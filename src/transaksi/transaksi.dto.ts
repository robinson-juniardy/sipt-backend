import { IsNotEmpty, IsPositive, IsDate, isNotEmpty } from 'class-validator';

export class CreateCutiDto {
  @IsNotEmpty()
  id_pegawai: number;

  @IsNotEmpty()
  alasan: string;

  @IsNotEmpty()
  alamat: string;

  @IsNotEmpty()
  //   @IsDate()
  tgl_mulai: string;

  @IsNotEmpty()
  //   @IsDate()
  tgl_selesai: string;

  @IsNotEmpty()
  @IsPositive()
  durasi: string;

  @IsNotEmpty()
  jenis_cuti: number;
}

export class UpdateStatusCutiDto {
  @IsNotEmpty()
  id_cuti: number;

  @IsNotEmpty()
  status_dokumen: number;
}

export class UploadEkitaDto {
  @IsNotEmpty()
  id_pegawai: number;

  @IsNotEmpty()
  tahun: string;

  @IsNotEmpty()
  bulan: string | number;

  @IsNotEmpty()
  filename: string;
}
