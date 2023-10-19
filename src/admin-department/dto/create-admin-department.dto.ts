import { IsInt, IsOptional, IsString } from "class-validator";

// Admin department filter dto
export class FilterAdminDepartmentsDto {
  // Optional Department id to be filtered for admin departments
  @IsOptional()
  @IsInt()
  departmentId?: number;

  // Optional Name of the admin department to be searched
  @IsOptional()
  @IsString()
  name?: string;

  // Optional limit for pagination, validate that it's an integer.
  @IsOptional()
  @IsInt()
  limit?: number = 10;

  // Optional offset for pagination, validate that it's an integer.
  @IsOptional()
  @IsInt()
  offset?: number = 0;
}
