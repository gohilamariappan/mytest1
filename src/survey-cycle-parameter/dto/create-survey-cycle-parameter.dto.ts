import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
} from "class-validator";

export class CreateSurveyCycleParameterDto {
  @IsNotEmpty()
  @IsDate()
  startTime: Date;

  @IsNotEmpty()
  @IsDate()
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
