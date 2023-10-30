import { Module } from "@nestjs/common";
import { MockUserService } from "src/mockModules/mock-user/mock-user.service";
import { SurveyConfigService } from "src/survey-config/survey-config.service";
import { UserMetadataController } from "./user-metadata.controller";
import { UserMetadataService } from "./user-metadata.service";

@Module({
  controllers: [UserMetadataController],
  providers: [UserMetadataService, SurveyConfigService, MockUserService],
  exports: [UserMetadataService],
})
export class UserMetadataModule {}
