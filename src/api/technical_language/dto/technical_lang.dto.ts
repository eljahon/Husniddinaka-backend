import {
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateTechDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'first-name',
    description: 'The event temp id of the event',
  })
  name: string;
}
