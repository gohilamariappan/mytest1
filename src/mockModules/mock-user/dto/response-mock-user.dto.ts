import { ResponseMockLevelDto } from "src/mockModules/mock-level/dto/response-mock-level.dto";

export class ResponseMockUserDto {
  readonly id: string;
  readonly email: string;
  readonly role: string;
  readonly userName: string;
  readonly profilePicture?: string;
  readonly levelNumber: number;
  readonly Level: ResponseMockLevelDto;
  readonly designation: String;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
