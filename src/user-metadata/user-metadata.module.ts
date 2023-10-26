import { Module } from '@nestjs/common';
import { UserMetadataController } from './user-metadata.controller';
import { UserMetadataService } from './user-metadata.service';
import { SurveyConfigService } from 'src/survey-config/survey-config.service';
import { MockUserService } from 'src/mockModules/mock-user/mock-user.service';

@Module({
  controllers: [UserMetadataController],
  providers: [UserMetadataService, SurveyConfigService, MockUserService]
})
export class UserMetadataModule {}
