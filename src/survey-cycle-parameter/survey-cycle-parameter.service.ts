import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateSurveyCycleParameterDto } from "./dto/create-survey-cycle-parameter.dto";
import { UpdateSurveyCycleParameterDto } from "./dto/update-survey-cycle-parameter.dto";

@Injectable()
export class SurveyCycleParameterService {
  constructor(private prisma: PrismaService) {}

  // To check if the survey parameter exist in database or not
  async checkIfSurveyParameterExists() {
    return this.prisma.surveyCycleParameter.findFirst();
  }

  async createSurveyParameter(
    createSurveyCycleParameterDto: CreateSurveyCycleParameterDto
  ) {
    const existingSurveyParameter = await this.checkIfSurveyParameterExists();

    if (existingSurveyParameter) {
      throw new ConflictException("Survey parameter already exists.");
    }

    // create a new survey parameter
    const newSurveyParameter = await this.prisma.surveyCycleParameter.create({
      data: createSurveyCycleParameterDto,
    });
    return newSurveyParameter;
  }

  async getAllSurveyParameter() {
    return this.prisma.surveyCycleParameter.findMany();
  }

  async updateSurveyParameterById(
    surveyParameterId: number,
    updateSurveyCycleParameter: UpdateSurveyCycleParameterDto
  ) {
    // check if for the given id, data is available in db or not
    const findSurveyParameterId =
      await this.prisma.surveyCycleParameter.findUnique({
        where: {
          id: surveyParameterId,
        },
      });
    if (!findSurveyParameterId) {
      throw new NotFoundException(
        `Survey parameter with ID ${findSurveyParameterId} not found.`
      );
    }
    // update an existing survey parameter by its unique identifier (id).
    return this.prisma.surveyCycleParameter.update({
      where: {
        id: surveyParameterId,
      },
      data: updateSurveyCycleParameter,
    });
  }
}
