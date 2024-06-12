import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'johndoe' })
  first_name: string;

  @IsNotEmpty()
  @ApiProperty({ example: '+998 ## ### ## ##' })
  phone_number: string;
}
