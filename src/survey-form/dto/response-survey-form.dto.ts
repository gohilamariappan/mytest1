import { SurveyStatusEnum } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";

export class ResponseSurveyFormDto {
  readonly id: number;
  readonly userId: number;
  readonly surveyConfigId: number;
  readonly status: SurveyStatusEnum;
  readonly questionsJson: JsonValue;
  readonly overallScore: number;
  readonly sunbirdCredentialIds: string;
}

export class SurveyFormResponse {
  readonly data?: ResponseSurveyFormDto;
  readonly message: string;
}
