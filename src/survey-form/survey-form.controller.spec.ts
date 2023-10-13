import { Test, TestingModule } from '@nestjs/testing';
import { SurveyFormController } from './survey-form.controller';

describe('SurveyFormController', () => {
  let controller: SurveyFormController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurveyFormController],
    }).compile();

    controller = module.get<SurveyFormController>(SurveyFormController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
