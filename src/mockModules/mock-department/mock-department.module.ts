import { Module } from "@nestjs/common";
import { MockDepartmentService } from "./mock-department.service";
import { MockDepartmentController } from "./mock-department.controller";

@Module({
  controllers: [MockDepartmentController],
  providers: [MockDepartmentService],
})
export class MockDepartmentModule {}
