import { ApiProperty } from "@nestjs/swagger";
import { SurveyStatusEnum } from "@prisma/client";
import { IsEnum, IsNotEmpty } from "class-validator";

export class UpdateSurveyFormDto {
  @ApiProperty({ enum: SurveyStatusEnum, example: "CREATED" })
  @IsEnum(SurveyStatusEnum)
  @IsNotEmpty()
  status: SurveyStatusEnum;
}
