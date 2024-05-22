import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { Gender } from '../../../enums';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'John Doe' })
  name: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ example: '2000-02-08' })
  dateOfBirth: Date;

  @IsEnum(Gender)
  @ApiProperty({ example: Gender.MALE })
  gender: Gender;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'johndoe' })
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @ApiProperty({ example: 'johndoe123' })
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @ApiProperty({ example: 'johndoe123' })
  rePassword: string;
}
