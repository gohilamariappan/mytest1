import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateFileUploadDto {
  // Competency associated with Question bank csv file
  @IsNotEmpty()
  @IsString()
  competency: string;

  // competencyLevel number of the uploaded question bank csv file
  @IsNotEmpty()
  @IsInt()
  competencyLevelNumber: number;

  // Questions of the uploaded question bank csv file
  @IsNotEmpty()
  @IsString()
  question: string;
}
