import { Module } from '@nestjs/common';
import { MockCompetencyLevelController } from './mock-competency-level.controller';
import { MockCompetencyLevelService } from './mock-competency-level.service';
import { PrismaService } from "../../prisma/prisma.service";

@Module({
  imports: [PrismaService],
  controllers: [MockCompetencyLevelController],
  providers: [MockCompetencyLevelService],
})
export class MockCompetencyLevelModule {}
