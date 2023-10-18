import { ApiProperty } from "@nestjs/swagger";
import { TimeUnitsEnum } from "@prisma/client";
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class CreateSurveyConfigDto {
  @IsNotEmpty()
  @IsInt()
  departmentId: number;

  @IsNotEmpty()
  @IsInt()
  onboardingTime: number;

  @ApiProperty({ enum: TimeUnitsEnum })
  @IsEnum(TimeUnitsEnum, { each: true })
  onboardingTimeUnit: TimeUnitsEnum;

  // start time for the survey config
  @IsNotEmpty()
  @IsDate()
  startTime: Date;

  // end time for the survey config
  @IsNotEmpty()
  @IsDate()
  endTime: Date;
}

// SurveyConfigFilterDto is used for filtering and paginating survey config.
export class SurveyConfigFilterDto {
  // Optional maxQuestions filter validate that its a number
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  departmentId?: number;

  //Optional startTime filter validate that its valid date-time value
  @IsOptional()
  @IsNotEmpty()
  @IsDate()
  startTime?: Date;

  //Optional endTime filter validate that its valid date-time value.
  @IsOptional()
  @IsNotEmpty()
  @IsDate()
  endTime?: Date;

  // Optional limit for pagination, validate that it's an integer.
  @IsOptional()
  @IsInt()
  limit?: number = 10;

  // Optional offset for pagination, validate that it's an integer.
  @IsOptional()
  @IsInt()
  offset?: number = 0;
}
