import { Module } from '@nestjs/common';
import { AdminDepartmentService } from './admin-department.service';
import { AdminDepartmentController } from './admin-department.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MockDepartmentService } from 'src/mockModules/mock-department/mock-department.service';

@Module({
  // Import the PrismaModule to make Prisma service available within this module
  imports: [PrismaModule],

  // Declare the AdminDepartmentController as a controller for this module
  controllers: [AdminDepartmentController],

  // Declare the AdminDepartmentService and PrismaService as providers (singleton) for this module
  providers: [AdminDepartmentService, PrismaService,MockDepartmentService],

  // Export the AdminDepartmentService to make it available for other modules that import this module
  exports: [AdminDepartmentService]
})
export class AdminDepartmentModule {}
