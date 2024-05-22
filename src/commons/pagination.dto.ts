import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { SortOrder } from '../enums';

export class PaginationDto {
  @Transform(({ value }) => parseInt(value))
  @ApiProperty({
    required: false,
    default: 1,
    description: 'Page number',
  })
  @IsInt({ message: 'Page number must be an integer' })
  @Min(1)
  page?: number;

  @Transform(({ value }) => parseInt(value))
  @ApiProperty({
    required: false,
    default: 10,
    description: 'Page size',
  })
  @IsInt({ message: 'Page size must be an integer' })
  @Min(1)
  @Max(100)
  pageSize?: number;

  @ApiProperty({
    required: false,
    default: 'id',
    description: 'Order by',
  })
  @IsString({ message: 'Sort by must be a string' })
  orderBy?: string;

  @ApiProperty({
    required: false,
    default: 'ASC',
    description: 'Order direction',
    enum: SortOrder,
  })
  @IsEnum(SortOrder, { message: 'Sort direction must be ASC or DESC' })
  @IsOptional()
  sortBy?: SortOrder = SortOrder.ASC;
}

export class PaginationResult<T> {
  data: T[];
  meta: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}
