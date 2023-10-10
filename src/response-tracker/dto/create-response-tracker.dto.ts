import { ApiProperty } from "@nestjs/swagger";
import { ResponseTrackerStatusEnum } from "@prisma/client";
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsObject,
  IsEnum,
} from "class-validator";

export class CreateResponseTrackerDto {
  @ApiProperty({ type: "integer", example: 1 })
  @IsNotEmpty()
  @IsInt()
  surveyFormId: number;

  @ApiProperty({ type: "integer", example: 2 })
  @IsNotEmpty()
  @IsInt()
  assesseeId: number;

  @ApiProperty({ type: "integer", example: 3 })
  @IsNotEmpty()
  @IsInt()
  assessorId: number;

  @ApiProperty({ type: "object", example: { question: true || false } })
  @IsOptional()
  @IsObject()
  responseJson?: Record<string, boolean>;

  @ApiProperty({ enum: ResponseTrackerStatusEnum, example: "Pending" })
  @IsNotEmpty()
  @IsEnum(ResponseTrackerStatusEnum)
  status: ResponseTrackerStatusEnum;
}
