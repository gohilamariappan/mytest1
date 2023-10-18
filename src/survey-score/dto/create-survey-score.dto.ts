import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateSurveyScoreDto {

  @IsNotEmpty()
  @IsNumber()
  surveyFormId: number;

  @IsNotEmpty()
  @IsNumber()
  competencyId: number;

  @IsNotEmpty()
  @IsNumber()
  competencyLevelId: number;

  @IsNotEmpty()
  @IsNumber()
  score: number;
}
