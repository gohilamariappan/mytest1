import { ApiProperty } from "@nestjs/swagger";
import { ResponseTrackerStatusEnum } from "@prisma/client";
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsArray,
  IsString,
} from "class-validator";

export class CreateResponseTrackerDto {
  @ApiProperty({ type: "integer", example: 1 })
  @IsNotEmpty()
  @IsInt()
  surveyFormId: number;

  @ApiProperty({ type: "integer", example: 2 })
  @IsNotEmpty()
  @IsString()
  assesseeId: string;

  @ApiProperty({ type: "integer", example: 3 })
  @IsNotEmpty()
  @IsString()
  assessorId: string;

  @ApiProperty({
    type: "array",
    example: [{ question: true || false || "don't know" }],
  })
  @IsOptional()
  @IsArray()
  responseJson?: Record<string, boolean>[];

  @ApiProperty({ enum: ResponseTrackerStatusEnum, example: "Pending" })
  @IsNotEmpty()
  @IsEnum(ResponseTrackerStatusEnum)
  status: ResponseTrackerStatusEnum;
}
