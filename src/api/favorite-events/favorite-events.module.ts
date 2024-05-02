import { Module } from '@nestjs/common';
import { FavoriteEventsService } from './favorite-events.service';
import { FavoriteEventsController } from './favorite-events.controller';

@Module({
  controllers: [FavoriteEventsController],
  providers: [FavoriteEventsService],
})
export class FavoriteEventsModule {}
