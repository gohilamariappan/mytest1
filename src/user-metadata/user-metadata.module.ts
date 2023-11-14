import { Module } from "@nestjs/common";
import { MockUserService } from "src/mockModules/mock-user/mock-user.service";
import { SurveyConfigModule } from "../survey-config/survey-config.module";
import { UserMetadataController } from "./user-metadata.controller";
import { UserMetadataService } from "./user-metadata.service";

@Module({
  imports:[SurveyConfigModule],
  controllers: [UserMetadataController],
  providers: [UserMetadataService, MockUserService],
  exports: [UserMetadataService],
})
export class UserMetadataModule {}
