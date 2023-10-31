import { Module } from "@nestjs/common";
import { AdminDepartmentModule } from "../admin-department/admin-department.module";
import { QuestionBankModule } from "../question-bank/question-bank.module";
import { ResponseTrackerService } from "../response-tracker/response-tracker.service";
import { SurveyConfigService } from "../survey-config/survey-config.service";
import { SurveyCycleParameterService } from "../survey-cycle-parameter/survey-cycle-parameter.service";
import { SurveyFormService } from "../survey-form/survey-form.service";
import { SurveyScoreService } from "../survey-score/survey-score.service";
import { SurveyService } from "../survey/survey.service";
import { UserMetadataModule } from "../user-metadata/user-metadata.module";
import { ScheduledTasksService } from "./scheduled-tasks.service";

@Module({
  imports: [QuestionBankModule, UserMetadataModule, AdminDepartmentModule],
  providers: [
    ScheduledTasksService,
    SurveyFormService,
    SurveyConfigService,
    SurveyService,
    SurveyCycleParameterService,
    SurveyScoreService,
    ResponseTrackerService,
  ],
})
export class ScheduledTasksModule {}
