import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateAdminCompetencyDto {
  @IsNotEmpty()
  @IsInt()
  competencyId: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    type: "array",
    example: [{ competencyLevelNumber: 1, competencyLevelName: "Level-1" }],
  })
  @IsNotEmpty()
  @IsArray()
  competencyLevels: Array<{
    competencyLevelNumber: number;
    competencyLevelName: string;
  }>;

  @IsNotEmpty()
  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsNotEmpty()
  @IsDate()
  @IsOptional()
  updatedAt?: Date;
}
