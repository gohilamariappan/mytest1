import { Module } from "@nestjs/common";
import { SurveyService } from "./survey.service";
import { SurveyController } from "./survey.controller";
import { SurveyFormService } from "src/survey-form/survey-form.service";
import { QuestionBankService } from "../question-bank/question-bank.service";
import { MockUserService } from "../mockModules/mock-user/mock-user.service";
import { MockDesignationService } from "../mockModules/mock-designation/mock-designation.service";
import { MockRoleService } from "../mockModules/mock-role/mock-role.service";
import { MockCompetencyService } from "../mockModules/mock-competency/mock-competency.service";
import { MockCompetencyLevelService } from "../mockModules/mock-competency-level/mock-competency-level.service";

@Module({
  providers: [
    SurveyService,
    SurveyFormService,
    QuestionBankService,
    MockUserService,
    MockDesignationService,
    MockRoleService,
    MockCompetencyService,
    MockCompetencyLevelService
  ],
  controllers: [SurveyController],
})
export class SurveyModule {}
