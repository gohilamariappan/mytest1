export class SurveyScoreResponse {
  readonly id: number;
  readonly surveyFormId: number;
  readonly competencyId: number;
  readonly competencyLevelId: number;
  readonly score: number;
}

export class ResponseMessageDto {
  statusCode?: number;
  message: string;
}

export class SurveyScoreResponseDto extends ResponseMessageDto {
  data?: SurveyScoreResponse;
}

export class SurveyScoreMultipleResponseDto {
  data?: SurveyScoreResponse[];
  message: string;
  statusCode?: number;
}
