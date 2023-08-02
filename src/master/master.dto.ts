import { IsNotEmpty } from 'class-validator';
export class UpdatePegawaiDto {
  @IsNotEmpty()
  id_pegawai: number;

  @IsNotEmpty()
  nip: string;

  nama: string;

  jabatan: number;

  golongan: number;

  pangkat: number;

  atasan_langsung: number;
}

export class CreatePegawaiDto {
  @IsNotEmpty()
  nip: string;

  @IsNotEmpty()
  nama: string;

  @IsNotEmpty()
  jabatan: number;

  @IsNotEmpty()
  golongan: number;

  @IsNotEmpty()
  pangkat: number;

  atasan_langsung: number;
}
