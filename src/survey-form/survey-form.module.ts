import { Module } from "@nestjs/common";
import { SurveyFormController } from "./survey-form.controller";
import { SurveyFormService } from "./survey-form.service";
import { PrismaService } from "../prisma/prisma.service";
import { ConfigService } from "@nestjs/config";

@Module({
  controllers: [SurveyFormController],
  providers: [SurveyFormService, PrismaService, ConfigService],
})
export class SurveyFormModule {}
