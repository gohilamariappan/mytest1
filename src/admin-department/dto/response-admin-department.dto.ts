import { ResponseSurveyConfigDto } from "../../survey-config/dto/response-survey-config.dto";

export class ResponseAdminDepartmentDto {
  readonly id: number;
  readonly name: string;
  readonly departmentId: number;
  readonly description?: string;
  readonly surveyConfig?: ResponseSurveyConfigDto
}
