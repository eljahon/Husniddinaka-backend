import { Module } from '@nestjs/common';
import { EventCategoriesService } from './event-categories.service';
import { EventCategoriesController } from './event-categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventCategoryEntity } from './entities/event-category.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([EventCategoryEntity]), UsersModule],
  controllers: [EventCategoriesController],
  providers: [EventCategoriesService],
  exports: [EventCategoriesService],
})
export class EventCategoriesModule {}
