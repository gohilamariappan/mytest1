import { Module } from '@nestjs/common';
import { AdminCompetencyService } from './admin-competency.service';
import { AdminCompetencyController } from './admin-competency.controller';

@Module({
  controllers: [AdminCompetencyController],
  providers: [AdminCompetencyService]
})
export class AdminCompetencyModule {}
