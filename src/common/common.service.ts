/* eslint-disable @typescript-eslint/no-unused-vars */

import { BadRequestException, Injectable } from '@nestjs/common';
import {
  FindManyOptions,
  FindOptionsOrder,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { FILTER_MAPPER } from './const/filter-mapper.const';
import { BasePaginationDto } from './dto/base-pagination.dto';
import { BaseModel } from './entity/base.entity';

@Injectable()
export class CommonService {
  paginate<T extends BaseModel>(
    dto: BasePaginationDto,
    repository: Repository<T>,
    overrideFindOptions: FindManyOptions<T> = {},
    path: string,
  ) {
    if (dto.page) {
      return this.pagePaginate(dto, repository, overrideFindOptions);
    } else {
      return this.cursorPaginate(dto, repository, overrideFindOptions, path);
    }
  }

  private async pagePaginate<T extends BaseModel>(
    dto: BasePaginationDto,
    repository: Repository<T>,
    overrideFindOptions: FindManyOptions<T> = {},
  ) {}

  private async cursorPaginate<T extends BaseModel>(
    dto: BasePaginationDto,
    repository: Repository<T>,
    overrideFindOptions: FindManyOptions<T> = {},
    path: string,
  ) {}

  private composeFindOptions<T extends BaseModel>(
    dto: BasePaginationDto,
  ): FindManyOptions<T> {
    let where: FindOptionsWhere<T> = {};
    let order: FindOptionsOrder<T> = {};

    for (const [key, value] of Object.entries(dto)) {
      if (key.startsWith('where__')) {
        where = { ...where, ...this.parseWhereFilter(key, value) };
      } else if (key.startsWith('order__')) {
        order = { ...order, ...this.parseOrderFilter(key, value) };
      }
    }

    return {
      where,
      order,
      take: dto.take,
      skip: dto.page ? dto.take * (dto.page - 1) : null,
    };
  }

  private parseWhereFilter<T extends BaseModel>(
    key: string,
    value: any,
  ): FindOptionsWhere<T> {
    const options: FindOptionsWhere<T> = {};

    const split = key.split['__'];

    if (split.length !== 2 && split.length !== 3) {
      throw new BadRequestException(
        `where 필터는 '__'로 split했을 때 길이가 2 또는 3이어야 합니다 - 문제되는 키값: ${key}`,
      );
    }

    if (split.length == 2) {
      const [_, field] = split;
      options[field] = value;
    } else {
      const [_, field, operator] = split;

      // const values = value.toString().split(',');

      // if (operator === 'between') {
      //   options[field] = FILTER_MAPPER[operator](value[0], values[1]);
      // } else {
      //   options[field] = FILTER_MAPPER[operator](value);
      // }

      options[field] = FILTER_MAPPER[operator](value);
    }

    return options;
  }

  private parseOrderFilter<T extends BaseModel>(
    key: string,
    value: any,
  ): FindOptionsOrder<T> {}
}
