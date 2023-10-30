import { Injectable, NotFoundException } from "@nestjs/common";
import {
  CreateQuestionBankDto,
  QuestionBankFilterDto,
} from "./dto/create-question-bank.dto";
import { UpdateQuestionBankDto } from "./dto/update-question-bank.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { MockUserService } from "src/mockModules/mock-user/mock-user.service";
import { MockRoleService } from "./../mockModules/mock-role/mock-role.service";
import { MockDesignationService } from "src/mockModules/mock-designation/mock-designation.service";

@Injectable()
export class QuestionBankService {
  constructor(
    private prisma: PrismaService,
    private mockUserService: MockUserService,
    private mockDesignationService: MockDesignationService,
    private mockRoleService: MockRoleService
  ) {}

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
      competencyLevelNumber,
      limit = 10,
      offset = 0,
      orderBy,
    } = filter;
    return this.prisma.questionBank.findMany({
      where: {
        competencyId: competencyId ?? undefined, // Optional compentencyId filter
        competencyLevelId: competencyLevelId ?? undefined, // Optional competencyLevelId filter
        competencyLevelNumber: competencyLevelNumber ?? undefined, // Optional competencyLevelNumber
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

  async deleteQuestionById(questionId: number) {
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
      },
    });
  }

  async getAllQuestionsForUser(userId: string) {
    const user = await this.mockUserService.findOne(userId);
    if (!user) {
      // Handle the case when the user is not found.
      throw new Error("User not found");
    }

    // Get the user's designation
    const designation = user.designation;

    // Get all the roles for a designation
    const userRoles =
      await this.mockDesignationService.findAllRolesForDesignation(designation);

    // Get roleId of each role of the user
    const roleIds = userRoles?.Roles.map((item) => {
      return item.id;
    });

    // unique competencyId associated with the roles of the user
    const competencyIds: any = [];
    if (roleIds?.length) {
      for (let i = 0; i < roleIds.length; i++) {
        const competency = (await this.mockRoleService.findRoleById(roleIds[i]))
          .competencies;
        competencyIds.push(
          ...competency.filter((item) => {
            if (!competencyIds.includes(item.competencyId)) {
              competencyIds.push(item.competencyId);
            }
          })
        );
      }
    }

    // Get competencyLevel for an user
    let competencyLevelNumber = user.Level?.levelNumber;

    const questionLists: any = [];
    if (competencyIds?.length && competencyLevelNumber) {
      for (let i = 0; i < competencyIds.length; i++) {
        while (competencyLevelNumber) {
          let question = await this.getAllQuestions({
            competencyId: competencyIds[i],
            competencyLevelNumber: competencyLevelNumber,
          });
          questionLists.push(...question);
          competencyLevelNumber--;
        }
      }
    }
    if (!questionLists.length) {
      throw new NotFoundException(`No Question Found for user with #${userId}`);
    }
    return questionLists;
  public async getQuestionById(id: number) {
    const question = await this.prisma.questionBank.findUnique({
      where: { id },
    });

    if (!question)
      throw new NotFoundException(`question with id #${id} not found`);
    return question;
  }
}
