import { IsInt, IsNotEmpty, IsNumber } from "class-validator";

export class CreateSurveyScoreDto {
  @IsNotEmpty()
  @IsInt()
  surveyFormId: number;

  @IsNotEmpty()
  @IsInt()
  competencyId: number;

  @IsNotEmpty()
  @IsInt()
  competencyLevelId: number;

  @IsNotEmpty()
  @IsNumber()
  score: number;
}

export class GenerateSurveyScoreDto {
  @IsNotEmpty()
  @IsInt()
  surveyFormId: number;
}
