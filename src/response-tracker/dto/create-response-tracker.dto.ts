import { ApiProperty } from "@nestjs/swagger";
import { ResponseTrackerStatusEnum } from "@prisma/client";
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsArray,
  IsUUID,
  IsNumber,
  IsString,
} from "class-validator";

export class CreateResponseTrackerDto {
  @ApiProperty({ type: "integer", example: 1 })
  @IsNotEmpty()
  @IsInt()
  surveyFormId: number;

  @ApiProperty({ type: "integer", example: 2 })
  @IsNotEmpty()
  @IsUUID()
  assesseeId: string;

  @ApiProperty({ type: "integer", example: 3 })
  @IsNotEmpty()
  @IsUUID()
  assessorId: string;

  @ApiProperty({
    type: "array",
    example: [{ questionId: "integer", answer: "Yes" || "No" || "DoNotKnow" }],
  })
    
  @IsOptional()
  @IsArray()
  responseJson?: Array<{ questionId: number; answer: AnswerEnum }>;

  @ApiProperty({ enum: ResponseTrackerStatusEnum, example: "Pending" })
  @IsNotEmpty()
  @IsEnum(ResponseTrackerStatusEnum)
  status: ResponseTrackerStatusEnum;
}

enum AnswerEnum {
  Yes,
  No,
  DoNotKnow,
}

export class responseObject {
  @IsNumber()
  @IsNotEmpty()
  questionId: number;

  @ApiProperty({ enum: AnswerEnum, example: "Yes" })
  @IsString()
  @IsNotEmpty()
  answer: AnswerEnum;
}
