import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateEventTempDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Pray of Fajr', description: 'The title of the event temp' })
  title: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1, description: 'The event category id of the event temp' })
  eventCategory: number;
}
