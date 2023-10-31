import { Module } from "@nestjs/common";
import { ResponseTrackerService } from "src/response-tracker/response-tracker.service";
import { SurveyFormService } from "src/survey-form/survey-form.service";
import { QuestionBankModule } from "../question-bank/question-bank.module";
import { SurveyScoreController } from "./survey-score.controller";
import { SurveyScoreService } from "./survey-score.service";

@Module({
  imports: [QuestionBankModule],
  controllers: [SurveyScoreController],
  providers: [
    SurveyScoreService,
    ResponseTrackerService,
    SurveyFormService
  ],
})
export class SurveyScoreModule {}
