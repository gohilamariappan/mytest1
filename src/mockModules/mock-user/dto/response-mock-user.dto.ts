import { ResponseMockRoleDto } from "src/mockModules/mock-role/dto";
import { ResponseDepartmentDto } from "src/mockModules/mock-department/dto/response-mock-department.dto";
import { ResponseMockLevelDto } from "src/mockModules/mock-level/dto/response-mock-level.dto";

export class ResponseMockUserDto {
  readonly id: number;
  readonly email: string;
  readonly role: string;
  readonly userName: string;
  readonly profilePicture?: string;
  readonly levelId?: number;
  readonly Level?: ResponseMockLevelDto;
  readonly departmentId?: number;
  readonly Department?: ResponseDepartmentDto;
  readonly Roles?: ResponseMockRoleDto[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
