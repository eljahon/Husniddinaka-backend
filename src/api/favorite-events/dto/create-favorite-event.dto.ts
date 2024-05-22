import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFavoriteEventDto {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    example: 1,
    description: 'The event id of the favorite event',
  })
  eventTemp: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ example: 1, description: 'The user id of the favorite event' })
  user: number;
}
