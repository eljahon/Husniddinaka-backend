import { IsDateString, IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SwapEventDto {
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    example: '2021-09-01 12:01:20',
    description: 'The start time of the event',
  })
  start: Date;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    example: '2021-09-01 12:01:20',
    description: 'The stop time of the event',
  })
  stop: Date;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ example: 1, description: 'The event temp id of the event' })
  startEventTemp: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ example: 1, description: 'The late minute' })
  lateMinute: number = 0;
}
