import { SurveyStatusEnum } from "@prisma/client";

export class ResponseSurveyFormDto{
    readonly id: number;
    readonly userId: number;
    readonly surveyConfigId: number;
    readonly status: SurveyStatusEnum;
    readonly questionsJson: Record<number,string>;
}