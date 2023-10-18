import { TimeUnitsEnum } from "@prisma/client";

export class ResponseSurveyCycleParameterDto {
  readonly id: number;
  readonly startTime: number;
  readonly endTime: TimeUnitsEnum;
  readonly surveyConfigId: number;
  readonly isActive: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
