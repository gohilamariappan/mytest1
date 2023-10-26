import { SurveyStatusEnum } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";

export class ResponseSurveyFormDto {
  readonly id: number;
  readonly userId: string;
  readonly surveyCycleParameterId: number;
  readonly status: SurveyStatusEnum;
  readonly questionsJson: JsonValue;
  readonly overallScore: number | null;
  readonly sunbirdCredentialIds: string | null;
}

export class SurveyFormResponse {
  readonly data?: ResponseSurveyFormDto;
  readonly message: string;
}
