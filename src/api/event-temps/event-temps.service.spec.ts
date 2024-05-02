import { Test, TestingModule } from '@nestjs/testing';
import { EventTempsService } from './event-temps.service';

describe('EventTempsService', () => {
  let service: EventTempsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventTempsService],
    }).compile();

    service = module.get<EventTempsService>(EventTempsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
