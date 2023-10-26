import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { FilterAdminDepartmentsDto } from "./dto/create-admin-department.dto";
import { UpdateAdminDepartmentDto } from "./dto/update-admin-department.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { MockDepartmentService } from "src/mockModules/mock-department/mock-department.service";

@Injectable()
export class AdminDepartmentService {
  constructor(
    private prisma: PrismaService,
    private departmentService: MockDepartmentService
  ) {}

  public async createOrUpdateAdminDepartment(id: number, requestType: string) {
    // Check the admin department exist for admin department db or not
    const checkExistingAdminDepartment =
      await this.prisma.adminDepartment.findUnique({
        where: {
          departmentId: id,
        },
      });
    // Check if the department exist in mock department module or not
    const adminDepartment = await this.departmentService.findOne(id);
    // If department does not exist in the department module then throw an error
    if (!adminDepartment) {
      throw new NotFoundException(
        `The Mock Admin Department for the #${id} not found.`
      );
    }
    // If admin department exist in db then update the existing admin department
    if (!checkExistingAdminDepartment && requestType === "patch") {
      throw new NotFoundException(
        `The Admin Department for the #${id} not found.`
      );
    }
    if (
      checkExistingAdminDepartment &&
      adminDepartment &&
      requestType === "patch"
    ) {
      const updatedAdminDepartment =
        await this.prisma.adminDepartment.updateMany({
          where: {
            departmentId: id,
          },
          data: {
            name: adminDepartment.name,
            description: adminDepartment.description,
          },
        });
      return updatedAdminDepartment;
    }
    // If department exist and we are trying to create a new admin department.
    if (checkExistingAdminDepartment && requestType === "post") {
      throw new ForbiddenException("Admin Department already exists.");
    }
    return this.prisma.adminDepartment.create({
      data: {
        departmentId: adminDepartment.id,
        name: adminDepartment.name,
        description: adminDepartment.description,
      },
    });
  }

  public async getAllAdminDepartment(filter: FilterAdminDepartmentsDto) {
    const { departmentId, name, limit = 10, offset = 0 } = filter;
    // Get all the admin department and filter using department Id and name.
    return this.prisma.adminDepartment.findMany({
      where: {
        departmentId: departmentId ?? undefined, // Optional departmentId filter
        name: name ?? undefined, // Optional filter by Name
      },
      skip: offset,
      take: limit,
    });
  }
}
