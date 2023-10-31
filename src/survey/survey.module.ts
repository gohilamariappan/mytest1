import { Module } from "@nestjs/common";
import { SurveyFormService } from "src/survey-form/survey-form.service";
import { QuestionBankModule } from "../question-bank/question-bank.module";
import { SurveyFormModule } from "../survey-form/survey-form.module";
import { SurveyController } from "./survey.controller";
import { SurveyService } from "./survey.service";

@Module({
  imports:[QuestionBankModule, SurveyFormModule],
  providers: [
    SurveyService,
    SurveyFormService,
  ],
  controllers: [SurveyController],
})
export class SurveyModule {}
