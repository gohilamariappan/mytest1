import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateQuestionBankDto {
  // Question for the question bank
  @IsNotEmpty()
  @IsString()
  question: string;
}