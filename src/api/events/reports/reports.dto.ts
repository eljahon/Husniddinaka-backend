import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { Transform } from "class-transformer";

export class DailyReportDto {
  @IsDateString()
  @IsOptional()
  @ApiProperty({
    required: false,
    default: '2024-05-29',
    description: 'The date of the report',
  })
  date: Date;
}

export class EventReportDto {
  @IsDateString()
  @ApiProperty({
    required: true,
    default: '2024-05-29',
    description: 'Start date of the report',
  })
  start_date: Date;

  @IsDateString()
  @ApiProperty({
    required: true,
    default: '2024-05-29',
    description: 'End date of the report',
  })
  end_date: Date;

  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    required: true,
    default: 1,
    description: 'The event temp id of the report',
  })
  eventTempId: number;
}
