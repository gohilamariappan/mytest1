export class ResponseQuestionBankDto {
  readonly competencyId: number;
  readonly competencyLevelId: number;
  readonly competencyLevelNumber: number;
  readonly question: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
