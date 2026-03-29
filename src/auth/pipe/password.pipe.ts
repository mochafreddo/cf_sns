import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

function toStringValue(value: unknown): string {
  if (typeof value === 'string') {
    return value;
  }

  if (
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === 'bigint'
  ) {
    return String(value);
  }

  throw new BadRequestException('문자열로 변환할 수 없는 값입니다.');
}

export class PasswordPipe implements PipeTransform<unknown, string> {
  transform(value: unknown): string {
    const stringValue = toStringValue(value);

    if (stringValue.length > 8) {
      throw new BadRequestException('비밀번호는 8자 이하로 입력해 주세요.');
    }

    return stringValue;
  }
}

@Injectable()
export class MaxLengthPipe implements PipeTransform<unknown, string> {
  constructor(
    private readonly length: number,
    private readonly subject: string,
  ) {}

  transform(value: unknown): string {
    const stringValue = toStringValue(value);

    if (stringValue.length > this.length) {
      throw new BadRequestException(
        `${this.subject}의 최대 길이는 ${this.length}입니다.`,
      );
    }

    return stringValue;
  }
}

@Injectable()
export class MinLengthPipe implements PipeTransform<unknown, string> {
  constructor(
    private readonly length: number,
    private readonly subject: string,
  ) {}

  transform(value: unknown): string {
    const stringValue = toStringValue(value);

    if (stringValue.length < this.length) {
      throw new BadRequestException(
        `${this.subject}의 최소 길이는 ${this.length}입니다.`,
      );
    }

    return stringValue;
  }
}
