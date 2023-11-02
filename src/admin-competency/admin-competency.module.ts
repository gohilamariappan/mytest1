import { Module } from "@nestjs/common";
import { MockCompetencyModule } from "src/mockModules/mock-competency/mock-competency.module";
import { AdminCompetencyController } from "./admin-competency.controller";
import { AdminCompetencyService } from "./admin-competency.service";

@Module({
  imports: [MockCompetencyModule],
  controllers: [AdminCompetencyController],
  providers: [AdminCompetencyService],
  exports: [AdminCompetencyService],
})
export class AdminCompetencyModule {}
