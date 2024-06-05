import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class EventTempQueryDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'The title of the event temp',
  })
  title: string = '';

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'The event category id of the event temp',
  })
  eventCategory: number;
}
