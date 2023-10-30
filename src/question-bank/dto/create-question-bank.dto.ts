import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

// CreateQuestionBankDto is used for creating a new question bank
export class CreateQuestionBankDto {
  // Compentency id associated with the question bank
  @IsNotEmpty()
  @IsInt()
  competencyId: number;

  // Question for the question bank
  @IsNotEmpty()
  @IsString()
  question: string;

  // Competency Level number for the question bank
  @IsNotEmpty()
  @IsInt()
  competencyLevelNumber: number;
}

// Question bank filter
export class QuestionBankFilterDto {
  // Optional competencyId filter, validated that it's valid compentency id or not
  @IsOptional()
  @IsInt()
  competencyId?: number;

  // Optional competencyLevelNumber filter, validate that it's valid competency Level number or not
  @IsOptional()
  @IsInt()
  competencyLevelNumber?: number;

  // Optional limit for pagination, validate that it's an integer.
  @IsOptional()
  @IsInt()
  limit?: number;

  // Optional offset for pagination, validate that it's an integer.
  @IsOptional()
  @IsInt()
  offset?: number;
 
  // Optional field to specify the order of results, validate that it's a string.
  @IsOptional()
  @IsString()
  orderBy?: string;
}
