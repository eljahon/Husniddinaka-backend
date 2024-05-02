import { Module } from '@nestjs/common';
import { EventCategoriesService } from './event-categories.service';
import { EventCategoriesController } from './event-categories.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventCategoryEntity } from "./entities/event-category.entity";

@Module({
  imports: [TypeOrmModule.forFeature([EventCategoryEntity])],
  controllers: [EventCategoriesController],
  providers: [EventCategoriesService],
})
export class EventCategoriesModule {}
