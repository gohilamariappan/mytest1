import { Test, TestingModule } from '@nestjs/testing';
import { SurveyScoreController } from './survey-score.controller';
import { SurveyScoreService } from './survey-score.service';

describe('SurveyScoreController', () => {
  let controller: SurveyScoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurveyScoreController],
      providers: [SurveyScoreService],
    }).compile();

    controller = module.get<SurveyScoreController>(SurveyScoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
