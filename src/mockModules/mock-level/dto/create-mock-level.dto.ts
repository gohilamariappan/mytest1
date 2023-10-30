import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateMockLevelDto {
  @IsInt()
  @IsNotEmpty()
  levelNumber: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;
}
