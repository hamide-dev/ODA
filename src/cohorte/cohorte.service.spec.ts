import { Test, TestingModule } from '@nestjs/testing';
import { CohorteService } from './cohorte.service';

describe('CohorteService', () => {
  let service: CohorteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CohorteService],
    }).compile();

    service = module.get<CohorteService>(CohorteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
