import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDepartmentDto, FilterAdminDepartmentsDto } from './dto/create-admin-department.dto';
import { UpdateAdminDepartmentDto } from './dto/update-admin-department.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminDepartmentService {
  constructor(private prisma: PrismaService) {}

  public async createAdminDepartment(
    createAdminDepartmentDto: CreateAdminDepartmentDto
  ) {
    // Create a new Admin department
    const createNewDepartment = await this.prisma.adminDepartment.create({
      data: createAdminDepartmentDto
    })
    return createNewDepartment;
  }

  public async getAllAdminDepartment(filter : FilterAdminDepartmentsDto) {
    const { departmentId, name, limit = 10, offset = 0 } = filter;
    // Get all the admin department and filter using department Id and name.
    return this.prisma.adminDepartment.findMany({
      where: {
        departmentId: departmentId ?? undefined, // Optional departmentId filter
        name: name ?? undefined, // Optional filter by Name
      },
      skip: offset,
      take: limit
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
