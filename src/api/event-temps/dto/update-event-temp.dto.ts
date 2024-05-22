import { ApiProperty } from '@nestjs/swagger';
// import { CreateEventTempDto } from './create-event-temp.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateEventTempDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 3,
    description: 'The event category id of the event temp',
  })
  eventCategory: number;
}
