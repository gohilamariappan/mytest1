import { TimeUnitsEnum } from "@prisma/client";
import { ResponseSurveyCycleParameterDto } from "src/survey-cycle-parameter/dto/response-survey-cycle-parameter.dto";

export class ResponseSurveyConfigDto {
  readonly id: number;
  readonly departmentId: number;
  readonly onboardingTime: number;
  readonly onboardingTimeUnit: TimeUnitsEnum;
  readonly startTime: Date;
  readonly endTime: Date;
  readonly isActive: boolean;
  readonly SurveyCycleParameters?: ResponseSurveyCycleParameterDto[];
}
