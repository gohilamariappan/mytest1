import { Test, TestingModule } from '@nestjs/testing';
import { UserMetadataController } from './user-metadata.controller';

describe('UserMetadataController', () => {
  let controller: UserMetadataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserMetadataController],
    }).compile();

    controller = module.get<UserMetadataController>(UserMetadataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
