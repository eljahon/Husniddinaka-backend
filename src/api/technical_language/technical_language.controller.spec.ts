import { Test, TestingModule } from '@nestjs/testing';
import { Technical_languageController } from './technical_language.controller';
import { Technical_languageService } from './technical_language.service';

describe('UsersController', () => {
  let controller: Technical_languageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Technical_languageController],
      providers: [Technical_languageService],
    }).compile();

    controller = module.get<Technical_languageController>(
      Technical_languageController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
