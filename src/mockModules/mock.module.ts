import { Module } from "@nestjs/common";
import { MockRoleModule } from "./mock-role/mock-role.module";
import { MockCompetencyModule } from "./mock-competency/mock-competency.module";
import { MockCompetencyLevelModule } from "./mock-competency-level/mock-competency-level.module";
import { RouterModule } from "@nestjs/core";
import { MockUserModule } from "./mock-user/mock-user.module";
import { MockLevelModule } from "./mock-level/mock-level.module";
import { MockDepartmentModule } from "./mock-department/mock-department.module";
import { MockDesignationModule } from './mock-designation/mock-designation.module';

@Module({
  imports: [
    MockRoleModule,
    MockCompetencyModule,
    MockCompetencyLevelModule,
    MockUserModule,
    MockLevelModule,
    MockDepartmentModule,
    MockDesignationModule,
    RouterModule.register([
      { path: "mockFracService/", module: MockRoleModule },
      { path: "mockFracService/", module: MockCompetencyModule },
      { path: "mockFracService/", module: MockCompetencyLevelModule },
      { path: "mockFracService/", module: MockUserModule },
      { path: "mockFracService/", module: MockLevelModule },
      { path: "mockFracService/", module: MockDepartmentModule },
      { path: "mockFracService/", module: MockDesignationModule },
    ]),
  ],
})
export class MockFracModule {}
