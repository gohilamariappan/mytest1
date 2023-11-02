import { Module } from "@nestjs/common";
import { AdminDepartmentModule } from "src/admin-department/admin-department.module";
import { MockUserService } from "src/mockModules/mock-user/mock-user.service";
import { SurveyConfigService } from "src/survey-config/survey-config.service";
import { UserMetadataController } from "./user-metadata.controller";
import { UserMetadataService } from "./user-metadata.service";

@Module({
  imports: [AdminDepartmentModule],
  controllers: [UserMetadataController],
  providers: [UserMetadataService, SurveyConfigService, MockUserService],
  exports: [UserMetadataService],
})
export class UserMetadataModule {}
