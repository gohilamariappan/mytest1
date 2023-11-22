import { Module, forwardRef } from "@nestjs/common";
import { SurveyFormService } from "src/survey-form/survey-form.service";
import { QuestionBankModule } from "../question-bank/question-bank.module";
import { ResponseTrackerService } from "../response-tracker/response-tracker.service";
import { SurveyConfigModule } from "../survey-config/survey-config.module";
import { SurveyFormModule } from "../survey-form/survey-form.module";
import { UserMetadataModule } from "../user-metadata/user-metadata.module";
import { SurveyController } from "./survey.controller";
import { SurveyService } from "./survey.service";

@Module({
  imports: [
    QuestionBankModule,
    SurveyFormModule,
    forwardRef(() => UserMetadataModule),
    forwardRef(() => SurveyConfigModule)
  ],
  providers: [SurveyService, SurveyFormService, ResponseTrackerService],
  controllers: [SurveyController],
  exports: [SurveyService],
})
export class SurveyModule {}
