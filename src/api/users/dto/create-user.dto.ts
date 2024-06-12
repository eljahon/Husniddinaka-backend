import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Gender, Language_list, Marital_Status } from '../../../enums';
export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'first-name',
    description: 'The event temp id of the event',
  })
  first_name: string;
  @IsNotEmpty()
  @ApiProperty({
    example: 'current_position',
    description: 'The current_position',
  })
  current_position: string;
  @IsNotEmpty()
  @ApiProperty({
    example: 'registration_addres',
    description: 'The registration_addres',
  })
  registration_addres: string;
  @IsNotEmpty()
  @ApiProperty({
    example: 'addres',
    description: 'The addres',
  })
  addres: string;
  @IsNotEmpty()
  @ApiProperty({
    example: 'contacts',
    description: 'The contacts',
  })
  contacts: string;
  @IsNotEmpty()
  @ApiProperty({
    example: 'current_addres',
    description: 'The current_addres',
  })
  current_addres: string;
  @IsNotEmpty()
  @ApiProperty({
    example: 'graduted',
    description: 'The graduted',
  })
  graduted: string;

  @IsNotEmpty()
  @ApiProperty({
    example: '+99 8 ## ### ## ##',
    description: 'The phone number ',
  })
  phone_number: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'first-name',
    description: 'The acdemic_rank',
  })
  acdemic_rank: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'acdemic-degree',
    description: 'The acdemic_degree',
  })
  acdemic_degree: string;
  @ApiProperty({
    example: 'acdemic-degree',
    description: 'The degree',
  })
  degree: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'last-name',
    description: 'The event temp id of the event',
  })
  last_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({})
  education: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    example: '2021-09-01T00:00:00.000Z',
    description: 'The end date of the event',
  })
  dateOfBirth: Date;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ example: 23, description: 'The  age' })
  age: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description:
      'The ID of the technical_language_id who created the technical_language',
  })
  technical_language_id: number;

  @IsNotEmpty()
  @ApiProperty({
    example: 'birth_place',
    description: 'The event temp id of the event',
  })
  birth_place: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'bad habits not now',
    description: 'The event temp id of the event',
  })
  bad_habits: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'bad habits not now',
    description: 'The event temp id of the event',
  })
  habits: string;

  @IsEnum(Marital_Status)
  @IsNotEmpty()
  @ApiProperty({
    enum: Marital_Status,
    enumName: 'Status',
    description:
      'single, married, widowed, divorced, separated, certain, cases, registered, partnership',
  })
  marital_status: string;

  @IsEnum(Language_list)
  @IsNotEmpty()
  @ApiProperty({
    enum: Language_list,
    enumName: 'Status',
    description: 'beginner, intermediate, advanced',
  })
  language_list: string;

  @IsEnum(Gender)
  @IsNotEmpty()
  @ApiProperty({
    enum: Gender,
    enumName: 'Gender',
    description: 'female, male',
  })
  gender: string;
}
