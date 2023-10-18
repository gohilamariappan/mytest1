export class AdminCompetencyResponse {
  id: number;
  competencyId: number;
  name: string;
  description?: string;
  competencyLevels: CompetencyLevels[];
  createdAt?: Date;
  updatedAt?: Date;
}

class CompetencyLevels {
  competencyLevelNumber: number;
  competencyLevelName: string;
}

export class AdminCompetencyResponseDto {
  data?: AdminCompetencyResponse;
  message: string;
  statusCode?: number;
}

export class AdminCompetencyArrayResponseDto {
  data?: AdminCompetencyResponse[];
  message: string;
  statusCode?: number;
}
