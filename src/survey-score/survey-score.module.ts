import { Module } from "@nestjs/common";
import { QuestionBankService } from "src/question-bank/question-bank.service";
import { ResponseTrackerService } from "src/response-tracker/response-tracker.service";
import { SurveyFormService } from "src/survey-form/survey-form.service";
import { SurveyScoreController } from "./survey-score.controller";
import { SurveyScoreService } from "./survey-score.service";

@Module({
  controllers: [SurveyScoreController],
  providers: [
    SurveyScoreService,
    ResponseTrackerService,
    QuestionBankService,
    SurveyFormService,
  ],
})
export class SurveyScoreModule {}
