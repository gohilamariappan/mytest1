import { Type } from "class-transformer";
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from "class-validator";

export class CreateSurveyCycleParameterDto {
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  startTime: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  endTime: Date;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  surveyConfigId?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsDate()
  createdAt?: Date = new Date();

  @IsOptional()
  @IsNotEmpty()
  @IsDate()
  updatedAt?: Date;
}

export class SurveyCycleParameterFilterDto {
  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  departmentId?: number;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  surveyConfigId?: number;

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  isActive? : boolean;
}
