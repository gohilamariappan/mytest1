import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateSurveyScoreDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  surveyFormId: number;

  @IsNotEmpty()
  @IsNumber()
  roleId: number;

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
