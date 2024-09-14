import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export default class Pagination {
  @ApiProperty({
    example: 1,
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  page: number = 1;

  @ApiProperty({
    example: 10,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  size: number = 10;
}
