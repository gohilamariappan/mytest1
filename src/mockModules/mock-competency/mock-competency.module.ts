import { Module } from "@nestjs/common";
import { MockCompetencyLevelService } from "../mock-competency-level/mock-competency-level.service";
import { MockCompetencyController } from "./mock-competency.controller";
import { MockCompetencyService } from "./mock-competency.service";
import { PrismaService } from "../../prisma/prisma.service";

@Module({
  imports: [PrismaService],
  controllers: [MockCompetencyController],
  providers: [MockCompetencyService, MockCompetencyLevelService],
  exports: [MockCompetencyService],
})
export class MockCompetencyModule {}
