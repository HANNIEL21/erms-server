import { Test, TestingModule } from '@nestjs/testing';
import { RsuApiService } from './rsu-api.service';

describe('RsuApiService', () => {
  let service: RsuApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RsuApiService],
    }).compile();

    service = module.get<RsuApiService>(RsuApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
