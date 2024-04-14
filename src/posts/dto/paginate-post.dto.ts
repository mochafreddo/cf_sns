import { IsIn, IsNumber, IsOptional } from 'class-validator';

export class paginatePostDto {
  @IsNumber()
  @IsOptional()
  where__id_less_than?: number;

  @IsNumber()
  @IsOptional()
  where__id_more_than?: number;

  @IsIn(['ASC', 'DESC'] as const)
  @IsOptional()
  order__createdAt: 'ASC' | 'DESC' = 'ASC';

  @IsNumber()
  @IsOptional()
  take: number = 20;
}
