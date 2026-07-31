import { Test, TestingModule } from '@nestjs/testing';
import { ApprenantsController } from './apprenants.controller';
import { ApprenantsService } from './apprenants.service';

describe('ApprenantsController', () => {
  let controller: ApprenantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApprenantsController],
      providers: [ApprenantsService],
    }).compile();

    controller = module.get<ApprenantsController>(ApprenantsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
