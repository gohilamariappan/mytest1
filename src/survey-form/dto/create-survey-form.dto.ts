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
  
  @ApiProperty({ type: "array", example: [{ number: "value" }] })
  @IsArray()
  @IsNotEmpty()
  questionsJson: Record<number, string>[];
}
