import { Inject, Injectable } from '@nestjs/common';
import { Role, Users } from '../database/entities/users.entity';
import { IUsersLogin } from './users.interface';
import { CreateUsersDto } from './users.dto';
import Crypto from 'crypto-js';
import { Op } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY') private usersRepository: typeof Users,
    @Inject('ROLE_REPOSITORY') private roleRepository: typeof Role,
  ) {}

  async findAll(): Promise<Users[]> {
    return this.usersRepository.findAll<Users>({
      include: {
        all: true,
      },
      where: {
        role: { [Op.in]: [3, 4, 5, 6] },
      },
    });
  }

  async SaveUsers(dto: CreateUsersDto) {
    return this.usersRepository.create({
      username: dto.username,
      password: dto.password,
      role: dto.role,
      id_pegawai: dto.id_pegawai,
    });
  }

  async FindAllRole(): Promise<Role[]> {
    return this.roleRepository.findAll<Role>({
      include: {
        all: true,
      },
    });
  }

  async loginCheck(params: IUsersLogin): Promise<Users[]> {
    return this.usersRepository.findAll<Users>({
      include: {
        all: true,
      },
      where: {
        username: params.username,
        password: params.password,
      },
    });
  }
}
