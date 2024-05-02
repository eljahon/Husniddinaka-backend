import { Injectable } from '@nestjs/common';
import { CreateFavoriteEventDto } from './dto/create-favorite-event.dto';

@Injectable()
export class FavoriteEventsService {
  create(createFavoriteEventDto: CreateFavoriteEventDto) {
    return 'This action adds a new favoriteEvent';
  }

  findAll() {
    return `This action returns all favoriteEvents`;
  }

  remove(id: number) {
    return `This action removes a #${id} favoriteEvent`;
  }
}
