import { Test, TestingModule } from '@nestjs/testing';
import { CohorteController } from './cohorte.controller';
import { CohorteService } from './cohorte.service';

describe('CohorteController', () => {
  let controller: CohorteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CohorteController],
      providers: [CohorteService],
    }).compile();

    controller = module.get<CohorteController>(CohorteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
