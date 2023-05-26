import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/entities/Users';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getUser() {}

  async postUsers(email: string, nickname: string, password: string) {
    if (!email) {
      return;
    }
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await this.usersRepository.save({
      email,
      nickname,
      password: hashedPassword,
    });
  }
}
