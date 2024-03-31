import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersModel } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersModel)
    private readonly usersRepository: Repository<UsersModel>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const { nickname, email, password } = createUserDto;

    const nicknameExists = await this.usersRepository.exists({
      where: { nickname },
    });
    if (nicknameExists)
      throw new BadRequestException('이미 존재하는 nickname 입니다!');

    const emailExists = await this.usersRepository.exists({ where: { email } });
    if (emailExists) throw new BadRequestException('이미 가입한 이메일입니다!');

    const userObject = this.usersRepository.create({
      nickname,
      email,
      password,
    });

    const newUser = await this.usersRepository.save(userObject);

    return newUser;
  }

  async getAllUsers() {
    return this.usersRepository.find();
  }

  async getUserByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }
}
