import {
  IsDate,
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

  // Compentency level id associated with the question bank
  @IsNotEmpty()
  @IsInt()
  competencyLevelId: number;

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

// Question bank filter
export class QuestionBankFilterDto {
  // Optional competencyId filter, validated that it's valid compentency id or not
  @IsOptional()
  @IsInt()
  competencyId?: number;

  // Optional competencyLevelId filter, validated that it's valid competencyLevel Id or not
  @IsOptional()
  @IsInt()
  competencyLevelId?: number;

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
