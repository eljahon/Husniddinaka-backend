import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEventCategoryDto {
  @ApiProperty({
    example: 'Namaz',
    description: 'The name of the event category',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
