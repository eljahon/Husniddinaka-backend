import { Test, TestingModule } from '@nestjs/testing';
import { EventTempsController } from './event-temps.controller';
import { EventTempsService } from './event-temps.service';

describe('EventTempsController', () => {
  let controller: EventTempsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventTempsController],
      providers: [EventTempsService],
    }).compile();

    controller = module.get<EventTempsController>(EventTempsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
