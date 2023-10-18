import { ApiProperty } from "@nestjs/swagger";
import { ResponseTrackerStatusEnum } from "@prisma/client";
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsArray,
  IsUUID,
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
    example: [{ question: true || false || "don't know" }],
  })
  @IsOptional()
  @IsArray()
  responseJson?: Record<number, boolean>[];

  @ApiProperty({ enum: ResponseTrackerStatusEnum, example: "Pending" })
  @IsNotEmpty()
  @IsEnum(ResponseTrackerStatusEnum)
  status: ResponseTrackerStatusEnum;
}
