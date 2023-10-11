export class SurveyScoreResponse {
  readonly id: number;
  readonly userId: number;
  readonly surveyFormId: number;
  readonly roleId: number;
  readonly competencyId: number;
  readonly competencyLevelId: number;
  readonly score: number;
}

export class SurveyScoreResponseDto {
  data?: SurveyScoreResponse;
  message: string;
  statusCode?: number;
}

export class SurveyScoreMultipleResponseDto {
  data?: SurveyScoreResponse[];
  message: string;
  statusCode?: number;
}
