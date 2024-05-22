import { Module } from '@nestjs/common';
import { EventTempsService } from './event-temps.service';
import { EventTempsController } from './event-temps.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventTempEntity } from './entities/event-temp.entity';
import { UsersModule } from '../users/users.module';
import { EventCategoriesModule } from '../event-categories/event-categories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventTempEntity]),
    UsersModule,
    EventCategoriesModule,
  ],
  controllers: [EventTempsController],
  providers: [EventTempsService],
  exports: [EventTempsService],
})
export class EventTempsModule {}
