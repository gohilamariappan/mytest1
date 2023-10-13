import { ResponseTrackerStatusEnum } from "@prisma/client";

export class ResponseTracker {
  readonly id: number;
  readonly assesseeId: number;
  readonly surveyFormId: number;
  readonly assessorId: number;
  readonly responseJson?: Record<string, any>;
  readonly status: ResponseTrackerStatusEnum;
}

export class ResponseTrackerDtoResponse {
  data?: ResponseTracker;
  message: string;
  statusCode?: number;
}

export class ResponseTrackerDtoMultipleResponse {
  data?: ResponseTracker[];
  message: string;
  statusCode?: number;
}
