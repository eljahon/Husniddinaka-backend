import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { FavoriteEventsService } from './favorite-events.service';
import { CreateFavoriteEventDto } from './dto/create-favorite-event.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('favorite-events')
@ApiTags('favorite-events')
export class FavoriteEventsController {
  constructor(private readonly favoriteEventsService: FavoriteEventsService) {}

  @Post()
  create(@Body() createFavoriteEventDto: CreateFavoriteEventDto) {
    return this.favoriteEventsService.create(createFavoriteEventDto);
  }

  @Get()
  findAll() {
    return this.favoriteEventsService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoriteEventsService.remove(+id);
  }
}
