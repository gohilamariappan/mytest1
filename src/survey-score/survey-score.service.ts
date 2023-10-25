import { Injectable, NotFoundException } from "@nestjs/common";
import { ResponseTrackerStatusEnum } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { QuestionBankService } from "src/question-bank/question-bank.service";
import { ResponseTrackerService } from "src/response-tracker/response-tracker.service";
import { SurveyFormService } from "src/survey-form/survey-form.service";
import { CreateSurveyScoreDto } from "./dto/create-survey-score.dto";
import { UpdateSurveyScoreDto } from "./dto/update-survey-score.dto";
import {
  IAnswerScore,
  IGroupScoreData,
} from "./interfaces/survey-score.interfaces";
import { AnswerEnum } from "src/response-tracker/enums/response-tracker.enums";
import { responseObject } from "src/response-tracker/dto";

@Injectable()
export class SurveyScoreService {
  constructor(
    private prisma: PrismaService,
    private responseTrackerService: ResponseTrackerService,
    private questionBankService: QuestionBankService,
    private surveyFormService: SurveyFormService
  ) {}

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

  public async update(id: number, updateSurveyScoreDto: UpdateSurveyScoreDto) {
    return await this.prisma.surveyScore.update({
      where: { id },
      data: updateSurveyScoreDto,
    });
  }

  public async remove(id: number) {
    return await this.prisma.surveyScore.delete({ where: { id } });
  }

  public async calculateSurveyScoreBySurveyFormId(
    surveyFormId: number
  ): Promise<String> {
    try {
      const completedSurveyResponses =
        await this.responseTrackerService.getAllResponseJsonBySurveyFormId(
          surveyFormId,
          ResponseTrackerStatusEnum.COMPLETED
        );

      const surveyResponses = completedSurveyResponses
        .map((response) => response.responseJson)
        .flat();

      const answerScore = this.calculateAnswerScore(surveyResponses);

      const answerScoreAndCompetencyGroupData: {
        [key: string]: IGroupScoreData;
      } = await this.getAnswerScoreAndCompetencyGroupData(answerScore);

      const groupedScoreDataByCompetency = this.groupScoreDataByCompetency(
        answerScoreAndCompetencyGroupData
      );

      const finalGroupedData = Object.values(groupedScoreDataByCompetency).map(
        (group: IGroupScoreData) => ({
          ...group,
          scorePercentage: Number(
            ((group.score / group.totalQuestions || 0) * 100).toFixed(2)
          ),
        })
      );

      const overallScore =
        this.calculateOverAllScoreFromFinalGropedData(finalGroupedData);

      await this.surveyFormService.updateSurveyFormScore(
        surveyFormId,
        overallScore
      );

      const scorePayload = this.formatScorePayloadFromFinalGroupDataAndFormId(
        surveyFormId,
        finalGroupedData
      );

      await this.prisma.surveyScore.createMany({
        data: scorePayload,
      });

      return `Successfully calculated score for survey form id #${surveyFormId}`;
    } catch (error) {
      throw error;
    }
  }

  public calculateAnswerScore(surveyResponses: responseObject[]): {
    [key: string]: IAnswerScore;
  } {
    return surveyResponses.reduce((acc, item) => {
      const { questionId, answer } = item;

      if (!acc[questionId]) {
        acc[questionId] = { score: 0, totalQuestions: 0 };
      }

      if (answer === AnswerEnum.YES) {
        acc[questionId].score += 1;
        acc[questionId].totalQuestions += 1;
      } else if (answer === AnswerEnum.NO) {
        acc[questionId].score += 0;
        acc[questionId].totalQuestions += 1;
      }

      return acc;
    }, {});
  }

  public async getAnswerScoreAndCompetencyGroupData(answerScore: {
    [key: string]: IAnswerScore;
  }): Promise<{ [key: string]: IGroupScoreData }> {
    const groupedData: { [key: string]: IGroupScoreData } = {};
    const questionIds = Object.keys(answerScore);

    // Create an array of promises for each iteration
    const promises = questionIds.map(async (questionId) => {
      const question = await this.questionBankService.getQuestionById(
        +questionId
      );
      const { competencyId, competencyLevelId, competencyLevelNumber } =
        question;

      const scoreData = answerScore[questionId];

      groupedData[questionId] = {
        score: scoreData.score,
        totalQuestions: scoreData.totalQuestions,
        competencyId,
        competencyLevelId,
        competencyLevelNumber,
        scorePercentage: 0,
      };
    });

    // Wait for all promises to resolve
    await Promise.all(promises);

    return groupedData;
  }

  public groupScoreDataByCompetency(groupedData: {
    [key: string]: IGroupScoreData;
  }): { [key: string]: IGroupScoreData } {
    return Object.values(groupedData).reduce((acc, item) => {
      const key = `${item.competencyId}-${item.competencyLevelId}-${item.competencyLevelNumber}`;

      if (!acc[key]) {
        acc[key] = {
          score: 0,
          totalQuestions: 0,
          competencyId: item.competencyId,
          competencyLevelId: item.competencyLevelId,
          competencyLevelNumber: item.competencyLevelNumber,
        };
      }

      acc[key].score += item.score;
      acc[key].totalQuestions += item.totalQuestions;

      return acc;
    }, {});
  }

  public calculateOverAllScoreFromFinalGropedData(
    finalGroupedData: IGroupScoreData[]
  ): number {
    const overallScore = finalGroupedData.reduce(
      (acc, group) => {
        acc.score += group.score;
        acc.totalQuestions += group.totalQuestions;
        return acc;
      },
      { score: 0, totalQuestions: 0 }
    );

    return Number(
      ((overallScore.score / overallScore.totalQuestions) * 100).toFixed(2)
    );
  }

  public formatScorePayloadFromFinalGroupDataAndFormId(
    surveyFormId: number,
    finalGroupedData: IGroupScoreData[]
  ) {
    return finalGroupedData.map((data: IGroupScoreData) => {
      const { competencyId, competencyLevelId, scorePercentage } = data;
      return {
        surveyFormId,
        competencyId,
        competencyLevelId,
        score: scorePercentage,
      };
    });
  }
}
