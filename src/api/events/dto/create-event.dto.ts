import { IsBoolean, IsDateString, IsInt, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateEventDto {

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ example: '2021-09-01T00:00:00.000Z', description: 'The start date of the event' })
  start: Date;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ example: '2021-09-01T00:00:00.000Z', description: 'The end date of the event' })
  end: Date;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ example: 60, description: 'The duration of the event in minutes' })
  duration: number;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ example: true, description: 'The status of the event' })
  processing: boolean;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ example: 1, description: 'The event temp id of the event' })
  eventTempId: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ example: 1, description: 'The parent event id of the event' })
  parentEventId: number;
}
