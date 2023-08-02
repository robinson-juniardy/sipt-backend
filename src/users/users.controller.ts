import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto, UsersLoginDto } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/all-users')
  async GetUsers() {
    return await this.usersService.findAll().then((data) => data);
  }

  @Get('/all-role')
  async GetRoles() {
    return await this.usersService.FindAllRole().then((data) => data);
  }

  @Post('/add')
  async CreateUser(@Body() params: CreateUsersDto) {
    return await this.usersService.SaveUsers(params).then((data) => data);
  }

  @Get('/check-users/:username/:password')
  async CheckUsers(
    @Param('username') username: string,
    @Param('password') password: string,
  ) {
    const params = {
      username,
      password,
    };
    const data = await this.usersService
      .loginCheck(params)
      .then((data) => data);
    return {
      status: true,
      message: 'Login Sukses',
      data: data,
    };
  }

  @Post('/login')
  async Login(@Body() params: UsersLoginDto) {
    const userchecking = await this.usersService
      .loginCheck(params)
      .then((data) => data);

    console.log(userchecking);

    if (userchecking.length > 0) {
      return {
        status: true,
        message: 'Login Sukses',
        data: userchecking,
      };
    } else {
      return {
        status: false,
        message: 'Login Gagal !! / User Tidak Terdaftar',
        data: null,
      };
    }
  }
}
