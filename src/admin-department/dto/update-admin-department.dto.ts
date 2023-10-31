import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateAdminDepartmentDto {
  // Optional Name field to update the name of the admin department
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
