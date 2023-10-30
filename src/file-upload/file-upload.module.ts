import { Module } from "@nestjs/common";
import { FileUploadService } from "./file-upload.service";
import { FileUploadController } from "./file-upload.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { PrismaService } from "src/prisma/prisma.service";
import { MockCompetencyService } from "src/mockModules/mock-competency/mock-competency.service";
import { MockCompetencyLevelService } from "src/mockModules/mock-competency-level/mock-competency-level.service";
import { QuestionBankService } from "src/question-bank/question-bank.service";

@Module({
  imports: [PrismaModule],
  controllers: [FileUploadController],
  providers: [
    FileUploadService,
    PrismaService,
    MockCompetencyService,
    MockCompetencyLevelService,
    QuestionBankService,
  ],
  exports: [FileUploadService],
})
export class FileUploadModule {}
