import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {
  FilterAdminDepartmentsDto,
} from "./dto/create-admin-department.dto";
import { UpdateAdminDepartmentDto } from "./dto/update-admin-department.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { MockDepartmentService } from "src/mockModules/mock-department/mock-department.service";

@Injectable()
export class AdminDepartmentService {
  constructor(
    private prisma: PrismaService,
    private departmentService: MockDepartmentService
  ) {}

  public async createAdminDepartment(
    id : number,
  ) {
    // Check the admin department exist for admin department db or not
    const checkExistingAdminDepartment =
      await this.prisma.adminDepartment.findUnique({
        where: {
          departmentId: id,
        },
      });
    // If admin department exist in db then throw an error
    if (checkExistingAdminDepartment) {
      throw new ForbiddenException("Admin Department already exists.");
    }

    // Check if the department exist in mock department module or not
    const adminDepartment = await this.departmentService.findOne(
      id
    );
    // If department does not exist in the department module then throw an error
    if (!adminDepartment) {
      throw new NotFoundException(`The Department for the #${id} not found.`);
    }
    return this.prisma.adminDepartment.create({
      data: {
        departmentId: adminDepartment.id,
        name: adminDepartment.name,
        description: adminDepartment.description
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

  public async updateAdminDepartmentById(
    adminDepartmentId: number,
    updateAdminDepartmentDto: UpdateAdminDepartmentDto
  ) {
    // Check if there is Admin department in the db for the id
    let checkExistingDepartment = await this.prisma.adminDepartment.findFirst({
      where: {
        id: adminDepartmentId,
      },
    });
    // If not found throw error message
    if (!checkExistingDepartment) {
      throw new NotFoundException(
        `Admin Department with ID "${adminDepartmentId}" not found.`
      );
    }
    // Otherwise update existing Admin department
    const updatedAdminDepartment = await this.prisma.adminDepartment.updateMany(
      {
        where: {
          id: adminDepartmentId,
        },
        data: updateAdminDepartmentDto,
      }
    );
    return updatedAdminDepartment;
  }
}
