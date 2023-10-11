import { Module } from '@nestjs/common';
import { SurveyFormController } from './survey-form.controller';
import { SurveyFormService } from './survey-form.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SurveyFormController],
  providers: [SurveyFormService, PrismaService]
})
export class SurveyFormModule {}
