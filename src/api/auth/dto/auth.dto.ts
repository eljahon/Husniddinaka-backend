import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'johndoe' })
  username: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'johndoe123' })
  password: string;
}
