import { Module, forwardRef } from "@nestjs/common";
import { QuestionBankService } from "src/question-bank/question-bank.service";
import { ResponseTrackerService } from "src/response-tracker/response-tracker.service";
import { SurveyFormService } from "src/survey-form/survey-form.service";
import { UserMetadataModule } from "src/user-metadata/user-metadata.module";
import { SurveyScoreController } from "./survey-score.controller";
import { SurveyScoreService } from "./survey-score.service";

@Module({
  imports: [forwardRef(() => UserMetadataModule)],
  controllers: [SurveyScoreController],
  providers: [
    SurveyScoreService,
    ResponseTrackerService,
    QuestionBankService,
    SurveyFormService,
  ],
})
export class SurveyScoreModule {}
