import { PickType } from '@nestjs/mapped-types';
import { UsersModel } from 'src/users/entities/users.entity';

export class UserRegisterDto extends PickType(UsersModel, [
  'nickname',
  'email',
  'password',
]) {}
