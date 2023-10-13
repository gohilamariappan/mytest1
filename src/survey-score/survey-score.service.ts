import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateSurveyScoreDto } from "./dto/create-survey-score.dto";
import { UpdateSurveyScoreDto } from "./dto/update-survey-score.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SurveyScoreService {
  constructor(private prisma: PrismaService) {}

  public async create(createSurveyScoreDto: CreateSurveyScoreDto) {
    return await this.prisma.surveyScore.create({ data: createSurveyScoreDto });
  }

  public async findAll() {
    return await this.prisma.surveyScore.findMany();
  }

  public async findOne(id: number) {
    const surveyScore = await this.prisma.surveyScore.findUnique({
      where: {
        id,
      },
    });

    if (!surveyScore)
      throw new NotFoundException(`survey score with id #${id} not found`);
    return surveyScore;
  }

  public async findBySurveyFormId(surveyFormId: number) {
    const surveyScore = await this.prisma.surveyScore.findMany({
      where: { surveyFormId },
    });
    if (!surveyScore || surveyScore.length === 0)
      throw new NotFoundException(
        `Survey score for survey form id #${surveyFormId} not found`
      );
    return surveyScore;
  }

  public async findByUserId(userId: number) {
    const surveyScore = await this.prisma.surveyScore.findMany({
      where: { userId },
    });
    if (!surveyScore || surveyScore.length === 0)
      throw new NotFoundException(
        `Survey score for user id #${userId} not found`
      );
    return surveyScore;
  }

  public async update(id: number, updateSurveyScoreDto: UpdateSurveyScoreDto) {
    return await this.prisma.surveyScore.update({
      where: { id },
      data: updateSurveyScoreDto,
    });
  }

  public async remove(id: number) {
    return await this.prisma.surveyScore.delete({ where: { id } });
  }
}
