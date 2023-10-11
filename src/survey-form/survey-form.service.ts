import { Injectable, NotFoundException } from "@nestjs/common";
import { SurveyStatusEnum } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateSurveyFormDto } from "./dto";

@Injectable()
export class SurveyFormService {
  constructor(private prisma: PrismaService) {}

  async createSurveyForm(createSurveyFormDto: CreateSurveyFormDto) {
    try {
      const surveyform = await this.prisma.surveyForm.create({
        data: { ...createSurveyFormDto },
      });
      return surveyform;
    } catch (error) {
      console.log({error,})
      throw new Error(error)
    }

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

  async updateSurveyForm(id: number, status: SurveyStatusEnum) {
    return this.prisma.surveyForm.update({
      where: { id },
      data: { status },
    });
  }

  async deleteSurveyForm(id: number) {
    return this.prisma.surveyForm.delete({
      where: { id },
    });
  }
}
