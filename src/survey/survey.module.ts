import { Module, forwardRef } from "@nestjs/common";
import { SurveyFormService } from "src/survey-form/survey-form.service";
import { QuestionBankModule } from "../question-bank/question-bank.module";
import { SurveyFormModule } from "../survey-form/survey-form.module";
import { SurveyController } from "./survey.controller";
import { SurveyService } from "./survey.service";
import { UserMetadataModule } from "../user-metadata/user-metadata.module";
import { ResponseTrackerService } from "../response-tracker/response-tracker.service";

@Module({
  imports: [
    QuestionBankModule,
    SurveyFormModule,
    forwardRef(() => UserMetadataModule),
  ],
  providers: [SurveyService, SurveyFormService, ResponseTrackerService],
  controllers: [SurveyController],
  exports: [SurveyService],
})
export class SurveyModule {}
