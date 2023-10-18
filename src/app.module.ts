import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { PrismaService } from "./prisma/prisma.service";
import { SurveyFormModule } from "./survey-form/survey-form.module";
import { ResponseTrackerModule } from "./response-tracker/response-tracker.module";
import { MockFracModule } from "./mockModules/mock.module";
import { SurveyScoreModule } from "./survey-score/survey-score.module";
import { QuestionBankModule } from "./question-bank/question-bank.module";
import { SurveyConfigModule } from "./survey-config/survey-config.module";
import { SurveyCycleParameterModule } from "./survey-cycle-parameter/survey-cycle-parameter.module";
import { AdminDepartmentModule } from './admin-department/admin-department.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    MockFracModule,
    SurveyFormModule,
    ResponseTrackerModule,
    SurveyScoreModule,
    QuestionBankModule,
    SurveyConfigModule,
    SurveyCycleParameterModule,
    AdminDepartmentModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
