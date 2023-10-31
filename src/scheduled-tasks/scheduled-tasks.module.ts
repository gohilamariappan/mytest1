import { Module } from "@nestjs/common";
import { ScheduledTasksService } from "./scheduled-tasks.service";
import { SurveyService } from "../survey/survey.service";
import { UserMetadataService } from "../user-metadata/user-metadata.service";
import { SurveyConfigService } from "../survey-config/survey-config.service";
import { SurveyFormService } from "../survey-form/survey-form.service";
import { MockUserService } from "../mockModules/mock-user/mock-user.service";
import { SurveyCycleParameterService } from "../survey-cycle-parameter/survey-cycle-parameter.service";
import { SurveyScoreService } from "../survey-score/survey-score.service";
import { ResponseTrackerService } from "../response-tracker/response-tracker.service";
import { QuestionBankService } from "../question-bank/question-bank.service";
import { MockDesignationService } from "../mockModules/mock-designation/mock-designation.service";
import { MockRoleService } from "../mockModules/mock-role/mock-role.service";
import { MockCompetencyService } from "../mockModules/mock-competency/mock-competency.service";
import { MockCompetencyLevelService } from "../mockModules/mock-competency-level/mock-competency-level.service";
import { AdminDepartmentService } from "../admin-department/admin-department.service";
import { MockDepartmentService } from "../mockModules/mock-department/mock-department.service";

@Module({
  providers: [
    ScheduledTasksService,
    SurveyFormService,
    MockUserService,
    SurveyConfigService,
    AdminDepartmentService,
    SurveyService,
    UserMetadataService,
    SurveyCycleParameterService,
    SurveyScoreService,
    ResponseTrackerService,
    QuestionBankService,
    MockDepartmentService,
    MockDesignationService,
    MockRoleService,
    MockCompetencyService,
    MockCompetencyLevelService
  ],
})
export class ScheduledTasksModule {}
