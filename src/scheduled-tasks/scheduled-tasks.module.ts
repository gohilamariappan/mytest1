import { Module } from "@nestjs/common";
import { QuestionBankModule } from "../question-bank/question-bank.module";
import { ResponseTrackerService } from "../response-tracker/response-tracker.service";
import { SurveyConfigModule } from "../survey-config/survey-config.module";
import { SurveyFormService } from "../survey-form/survey-form.service";
import { SurveyScoreService } from "../survey-score/survey-score.service";
import { SurveyService } from "../survey/survey.service";
import { UserMetadataModule } from "../user-metadata/user-metadata.module";
import { ScheduledTasksService } from "./scheduled-tasks.service";

@Module({
  imports: [QuestionBankModule, UserMetadataModule, SurveyConfigModule],
  providers: [
    ScheduledTasksService,
    SurveyFormService,
    SurveyService,
    SurveyScoreService,
    ResponseTrackerService,
  ],
})
export class ScheduledTasksModule {}
