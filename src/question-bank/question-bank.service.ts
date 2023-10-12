import { Injectable, NotFoundException } from "@nestjs/common";
import {
  CreateQuestionBankDto,
  QuestionBankFilterDto,
} from "./dto/create-question-bank.dto";
import { UpdateQuestionBankDto } from "./dto/update-question-bank.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class QuestionBankService {
  constructor(private prisma: PrismaService) {}

  async createQuestionByCompentencyLevel(
    createQuestionBankDto: CreateQuestionBankDto
  ) {
    // check for compentencyId exist in competency model in db
    const checkCompentencyId = await this.prisma.competency.findUnique({
      where: {
        id: createQuestionBankDto.competencyId,
      },
    });

    // check for competencyLevelId exist in competencyLevel model in db
    const checkCompetencyLevelId = await this.prisma.competencyLevel.findUnique(
      {
        where: {
          id: createQuestionBankDto.competencyLevelId,
        },
      }
    );
    // if not found throw error
    if (!checkCompentencyId || !checkCompetencyLevelId) {
      throw new NotFoundException(
        "Either Competency or Competency Level is not Found"
      );
    }
    // Otherwise create a new question bank
    const newQuestion = await this.prisma.questionBank.create({
      data: createQuestionBankDto,
    });
    return newQuestion;
  }

  async getAllQuestions(filter: QuestionBankFilterDto) {
    // Get all questions and filter using compentencyId and compentencyLevelId
    const {
      competencyId,
      competencyLevelId,
      limit = 10,
      offset = 0,
      orderBy,
    } = filter;
    return this.prisma.questionBank.findMany({
      where: {
        competencyId: competencyId ?? undefined, // Optional compentencyId filter
        competencyLevelId: competencyLevelId ?? undefined, // Optional competencyLevelId filter
      },
      orderBy: {
        [orderBy || "createdAt"]: "asc", // Default sorting by createdAt
      },
      skip: offset,
      take: limit,
    });
  }

  async updateQuestionById(
    questionId: number,
    updateQuestionBankDto: UpdateQuestionBankDto
  ) {
    // Check if there is question in db for the questionId
    const findQuestion = await this.prisma.questionBank.findUnique({
      where: {
        id: questionId,
      },
    });
    // If not found throw error message
    if (!findQuestion) {
      throw new NotFoundException(
        `No question exists with the id #${questionId}.`
      );
    }
    // Otherwise update it's details
    return this.prisma.questionBank.updateMany({
      where: {
        id: questionId,
      },
      data: updateQuestionBankDto,
    });
  }

  async deleteQuestionById(questionId : number) {
    // Check the question is there in db for the given questionId and competencyLevelId
    const findQuestion = await this.prisma.questionBank.findUnique({
      where: {
        id: questionId,
      },
    });
    // If not found throw error message
    if (!findQuestion) {
      throw new NotFoundException(
        `No question exists with the Id #${questionId}.`
      );
    }
    // Otherwise delete question related to that competency id
    return this.prisma.questionBank.delete({
      where: {
        id: questionId,
      }
    })
  }
}
