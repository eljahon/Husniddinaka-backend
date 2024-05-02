import { Module } from '@nestjs/common';
import { EventTempsService } from './event-temps.service';
import { EventTempsController } from './event-temps.controller';

@Module({
  controllers: [EventTempsController],
  providers: [EventTempsService],
})
export class EventTempsModule {}
