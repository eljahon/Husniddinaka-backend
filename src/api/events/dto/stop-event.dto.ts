import { IsDateString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StopEventDto {
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    example: '2021-09-01 12:30:40',
    description: 'The stop time of the event',
  })
  end: Date;
}
