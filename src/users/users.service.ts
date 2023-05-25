import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
      private usersRepository: Repository<Users>
  ){}
  getUser(){}
  
  async postUsers(email: string, nickname: string, password: string){
    const user = await this.usersRepository.findOne( {where: { email }})
  }
}
