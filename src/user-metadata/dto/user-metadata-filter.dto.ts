import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class UserMetadataFilterDto {
  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  isNewEmployee: boolean;

  @IsInt()
  @IsOptional()
  @IsNotEmpty()
  departmentId: number;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  designation: string;

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  isAdmin: boolean;

  @IsOptional()
  @IsInt()
  limit?: number;

  @IsOptional()
  @IsInt()
  offset?: number;
}
