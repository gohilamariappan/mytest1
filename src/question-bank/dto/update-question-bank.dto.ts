import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateQuestionBankDto {
  // Question for the question bank
  @IsNotEmpty()
  @IsString()
  question: string;

  // creation date-time for the question bank
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  // update date-time for the question bank
  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}
