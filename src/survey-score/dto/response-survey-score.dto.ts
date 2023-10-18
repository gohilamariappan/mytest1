export class SurveyScoreResponse {
  readonly id: number;
  readonly surveyFormId: number;
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
