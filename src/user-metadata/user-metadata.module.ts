import { Module } from "@nestjs/common";
import { UserMetadataController } from "./user-metadata.controller";
import { UserMetadataService } from "./user-metadata.service";
import { SurveyConfigService } from "../survey-config/survey-config.service";
import { MockUserService } from "../mockModules/mock-user/mock-user.service";
import { PrismaModule } from "../prisma/prisma.module";
import { AdminDepartmentModule } from "../admin-department/admin-department.module";

@Module({
  imports: [AdminDepartmentModule,PrismaModule],
  controllers: [UserMetadataController],
  providers: [UserMetadataService, SurveyConfigService, MockUserService],
  exports: [UserMetadataService],
})
export class UserMetadataModule {}
