import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteEventsController } from './favorite-events.controller';
import { FavoriteEventsService } from './favorite-events.service';

describe('FavoriteEventsController', () => {
  let controller: FavoriteEventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoriteEventsController],
      providers: [FavoriteEventsService],
    }).compile();

    controller = module.get<FavoriteEventsController>(FavoriteEventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
