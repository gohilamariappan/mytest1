import { Test, TestingModule } from '@nestjs/testing';
import { AdminCompetencyController } from './admin-competency.controller';
import { AdminCompetencyService } from './admin-competency.service';

describe('AdminCompetencyController', () => {
  let controller: AdminCompetencyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminCompetencyController],
      providers: [AdminCompetencyService],
    }).compile();

    controller = module.get<AdminCompetencyController>(AdminCompetencyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
