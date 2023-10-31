import { Module, forwardRef } from "@nestjs/common";
import { QuestionBankService } from "src/question-bank/question-bank.service";
import { ResponseTrackerService } from "src/response-tracker/response-tracker.service";
import { SurveyFormService } from "src/survey-form/survey-form.service";
import { UserMetadataModule } from "src/user-metadata/user-metadata.module";
import { SurveyScoreController } from "./survey-score.controller";
import { SurveyScoreService } from "./survey-score.service";
import { MockUserService } from "../mockModules/mock-user/mock-user.service";
import { MockDesignationService } from "../mockModules/mock-designation/mock-designation.service";
import { MockRoleService } from "../mockModules/mock-role/mock-role.service";
import { MockCompetencyService } from "../mockModules/mock-competency/mock-competency.service";
import { MockCompetencyLevelService } from "../mockModules/mock-competency-level/mock-competency-level.service";

@Module({
  imports: [forwardRef(() => UserMetadataModule)],
  controllers: [SurveyScoreController],
  providers: [
    SurveyScoreService,
    ResponseTrackerService,
    QuestionBankService,
    SurveyFormService,
    MockUserService,
    MockDesignationService,
    MockRoleService,
    MockCompetencyService,
    MockCompetencyLevelService
  ],
})
export class SurveyScoreModule {}
