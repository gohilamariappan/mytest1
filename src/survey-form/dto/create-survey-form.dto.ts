import { ApiProperty } from "@nestjs/swagger";
import { SurveyStatusEnum } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsNumber, IsObject } from "class-validator";

export class CreateSurveyFormDto{
    @ApiProperty({ type: "integer", example: 1 })
    @IsNumber()
    @IsNotEmpty()
    userId: number;
  
    @IsNumber()
    @IsNotEmpty()
    surveyConfigId: number;

    @ApiProperty({ enum: SurveyStatusEnum, example: "CREATED" })
    @IsEnum(SurveyStatusEnum)
    @IsNotEmpty()
    status: SurveyStatusEnum;

    @ApiProperty({ type: "object", example: { key: "value" } })
    @IsObject()
    @IsNotEmpty()
    questionsJson: Record<number, string>;
}