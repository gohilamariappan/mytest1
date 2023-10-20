import { Injectable, NotFoundException } from "@nestjs/common";
import { SurveyStatusEnum } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateSurveyFormDto } from "./dto";

@Injectable()
export class SurveyFormService {
  constructor(private prisma: PrismaService) {}

  async createSurveyForm(createSurveyFormDto: CreateSurveyFormDto) {
    const surveyFormDto = {
      ...createSurveyFormDto,
      questionsJson: JSON.parse(JSON.stringify(createSurveyFormDto.questionsJson))
    }
    return await this.prisma.surveyForm.create({
      data: { ...surveyFormDto },
    });
  }

  async findSurveyFormById(id: number) {
    const surveyForm = await this.prisma.surveyForm.findUnique({
      where: { id },
    });
    if (!surveyForm) {
      throw new NotFoundException("Survey Form not found");
    }
    return surveyForm;
  }

  async updateSurveyFormStatus(id: number, status: SurveyStatusEnum) {
    return await this.prisma.surveyForm.update({
      where: { id },
      data: { status },
    });
  }

  async updateSurveyFormScore(id: number, overallScore: number) {
    return await this.prisma.surveyForm.update({
      where: { id },
      data: { overallScore },
    });
  }

  async deleteSurveyForm(id: number) {
    return await this.prisma.surveyForm.delete({
      where: { id },
    });
  }
}
