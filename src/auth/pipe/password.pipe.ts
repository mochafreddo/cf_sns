import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class PasswordPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, metadata: ArgumentMetadata) {
    if (value.toString().lenth > 8) {
      throw new BadRequestException('비밀번호는 8자 이하로 입력해주세요.');
    }

    return value.toString();
  }
}