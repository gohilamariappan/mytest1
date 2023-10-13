import { Test, TestingModule } from '@nestjs/testing';
import { ResponseTrackerController } from './response-tracker.controller';
import { ResponseTrackerService } from './response-tracker.service';

describe('ResponseTrackerController', () => {
  let controller: ResponseTrackerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResponseTrackerController],
      providers: [ResponseTrackerService],
    }).compile();

    controller = module.get<ResponseTrackerController>(ResponseTrackerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
