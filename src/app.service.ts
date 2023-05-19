import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {
  constructor(private userService: UsersService) {}
  // constructor(private readonly configService: ConfigService) {}

  async getHello() {
    this.userService.getUser()
    this.getWow()
    return process.env.SECRET
  }

  async getWow() {}

  // getHello(): string {
  //   return this.configService.get('SECRET')
  // }
}
