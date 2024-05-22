import { Module } from '@nestjs/common';
import { FavoriteEventsService } from './favorite-events.service';
import { FavoriteEventsController } from './favorite-events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteEventEntity } from './entities/favorite-event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteEventEntity])],
  controllers: [FavoriteEventsController],
  providers: [FavoriteEventsService],
})
export class FavoriteEventsModule {}
