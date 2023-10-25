import { ApiProperty } from "@nestjs/swagger";
import { SurveyStatusEnum } from "@prisma/client";
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class responseObject {
  @IsNumber()
  @IsNotEmpty()
  questionId: number;

  @IsString()
  @IsNotEmpty()
  question: string;
}
export class CreateSurveyFormDto {
  @ApiProperty({ type: "integer", example: 1 })
  @IsNumber()
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  @IsNotEmpty()
  surveyCycleParameterId: number;
  
  @ApiProperty({ enum: SurveyStatusEnum, example: "CREATED" })
  @IsEnum(SurveyStatusEnum)
  @IsNotEmpty()
  status: SurveyStatusEnum;
  
  @ApiProperty({ type: "array", example: [{ questionId: 1, question: "Is this a dummy question?" }] })
  @IsArray()
  @IsNotEmpty()
  questionsJson: responseObject[];
}
