import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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

  async join(email: string, nickname: string, password: string) {
    if (!email) {
      throw new BadRequestException('이메일이 없네요');
    }
    if (!nickname) {
      throw new BadRequestException('닉네임이 없네요');
    }
    if (!password) {
      throw new BadRequestException('비밀번호가 없네요');
    }
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      throw new UnauthorizedException('이미 존재하는 사용자입니다');
    }
    console.log('password', password);
    const hashedPassword = await bcrypt.hash(password, 12);
    await this.usersRepository.save({
      email,
      nickname,
      password: hashedPassword,
    });
  }
}
