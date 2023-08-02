import { IsNotEmpty } from 'class-validator';

export class UsersLoginDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

export class CreateUsersDto {
  @IsNotEmpty()
  id_pegawai: number;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  role: number;
}
