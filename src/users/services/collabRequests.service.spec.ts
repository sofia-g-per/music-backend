import { Test, TestingModule } from '@nestjs/testing';
import { CollabRequestsService } from './collabRequests.service';

describe('CollabRequestsService', () => {
  let service: CollabRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollabRequestsService],
    }).compile();

    service = module.get<CollabRequestsService>(CollabRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
