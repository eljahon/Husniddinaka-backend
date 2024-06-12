import { Test, TestingModule } from '@nestjs/testing';
import { Technical_languageService } from './technical_language.service';

describe('UsersService', () => {
  let service: Technical_languageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Technical_languageService],
    }).compile();

    service = module.get<Technical_languageService>(Technical_languageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
