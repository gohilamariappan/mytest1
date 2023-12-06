import { Module, forwardRef } from "@nestjs/common";
import { FileUploadService } from "../file-upload/file-upload.service";
import { PrismaService } from "../prisma/prisma.service";
import { UserMetadataModule } from "../user-metadata/user-metadata.module";
import { SurveyConfigController } from "./survey-config.controller";
import { SurveyConfigService } from "./survey-config.service";

@Module({
  imports: [forwardRef(() => UserMetadataModule)],
  controllers: [SurveyConfigController],
  providers: [SurveyConfigService, FileUploadService, PrismaService],
  exports: [SurveyConfigService],
})
export class SurveyConfigModule {}
