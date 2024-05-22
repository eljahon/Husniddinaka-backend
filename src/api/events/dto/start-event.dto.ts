import { IsDateString, IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StartEventDto {
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    example: '2021-09-01 12:01:20',
    description: 'The start time of the event',
  })
  start: Date;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ example: 1, description: 'The event temp id of the event' })
  eventTemp: number;
}
