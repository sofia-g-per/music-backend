import { Test, TestingModule } from '@nestjs/testing';
import { CreatingRelationsService } from './creatingRelations.service';

describe('CreatingRelationsService', () => {
  let service: CreatingRelationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreatingRelationsService],
    }).compile();

    service = module.get<CreatingRelationsService>(CreatingRelationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
