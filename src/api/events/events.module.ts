import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { EventEntity } from './entities/event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { EventTempsModule } from '../event-temps/event-temps.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventEntity]),
    UsersModule,
    EventTempsModule,
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
