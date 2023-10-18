import { ApiProperty } from "@nestjs/swagger";
import { UserRolesEnum } from "@prisma/client";
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
} from "class-validator";

export class CreateMockUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ enum: UserRolesEnum, example: "CONSUMER" })
  @IsEnum(UserRolesEnum, { each: true, always: true })
  @IsNotEmpty()
  role: UserRolesEnum;

  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsStrongPassword()
  @IsString()
  password: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  profilePicture: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  levelId: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  departmentId: number;

  @IsNotEmpty()
  @IsString()
  designation: string;

  // Optional creation date of the request.
  @IsDate()
  @IsOptional()
  createdAt?: Date;

  // Optional update date of the request.
  @IsDate()
  @IsOptional()
  updatedAt?: Date;
}
