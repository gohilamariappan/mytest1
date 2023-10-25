import { ApiProperty } from "@nestjs/swagger";
import { SurveyStatusEnum } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";
import { SurveyScoreResponse } from "src/survey-score/dto";

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

export class SurveyScoresForUser {
  id: number;
  @ApiProperty({ enum: SurveyStatusEnum, example: SurveyStatusEnum.CLOSED })
  status: SurveyStatusEnum;
  userId: string;
  overallScore: number | null;
  sunbirdCredentialIds: string | null;
  SurveyScore: SurveyScoreResponse[];
  createdAt: Date;
  updatedAt: Date;
}
