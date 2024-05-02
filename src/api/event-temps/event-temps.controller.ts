import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { EventTempsService } from './event-temps.service';
import { CreateEventTempDto } from './dto/create-event-temp.dto';
import { UpdateEventTempDto } from './dto/update-event-temp.dto';
import { ApiTags } from "@nestjs/swagger";

@Controller('event-temps')
@ApiTags('event-temps')
export class EventTempsController {
  constructor(private readonly eventTempsService: EventTempsService) {}

  @Post()
  create(@Body() createEventTempDto: CreateEventTempDto) {
    return this.eventTempsService.create(createEventTempDto);
  }

  @Get()
  findAll() {
    return this.eventTempsService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEventTempDto: UpdateEventTempDto) {
    return this.eventTempsService.update(+id, updateEventTempDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventTempsService.remove(+id);
  }
}
