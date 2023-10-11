import { Module } from "@nestjs/common";
import { SurveyScoreService } from "./survey-score.service";
import { SurveyScoreController } from "./survey-score.controller";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  controllers: [SurveyScoreController],
  providers: [SurveyScoreService, PrismaService],
})
export class SurveyScoreModule {}
