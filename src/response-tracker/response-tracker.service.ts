import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateResponseTrackerDto } from "./dto/create-response-tracker.dto";
import { UpdateResponseTrackerDto } from "./dto/update-response-tracker.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ResponseTrackerService {
  constructor(private prisma: PrismaService) {}

  public async create(createResponseTrackerDto: CreateResponseTrackerDto) {
    return await this.prisma.responseTracker.create({
      data: createResponseTrackerDto,
    });
  }

  public async findAll() {
    return await this.prisma.responseTracker.findMany();
  }

  public async findOne(id: number) {
    const response = await this.prisma.responseTracker.findUnique({
      where: { id },
    });
    if (!response)
      throw new NotFoundException(`Response tracer with id #${id} not found`);
    return response;
  }

  public async findBySurveyFormId(surveyFormId: number) {
    const response = await this.prisma.responseTracker.findMany({
      where: { surveyFormId },
    });

    if (!response || response.length === 0)
      throw new NotFoundException(
        `Response tracer with surveyFormId #${surveyFormId} not found`
      );
    return response;
  }

  public async findByAssessorId(assessorId: number) {
    const response = await this.prisma.responseTracker.findMany({
      where: { assessorId },
    });

    if (!response || response.length === 0)
      throw new NotFoundException(
        `Response tracer with assessorId #${assessorId} not found`
      );
    return response;
  }

  public async findByAssesseeId(assesseeId: number) {
    const response = await this.prisma.responseTracker.findMany({
      where: { assesseeId },
    });

    if (!response || response.length === 0)
      throw new NotFoundException(
        `Response tracer with assesseeId #${assesseeId} not found`
      );
    return response;
  }

  public async update(
    id: number,
    updateResponseTrackerDto: UpdateResponseTrackerDto
  ) {
    return await this.prisma.responseTracker.update({
      where: { id },
      data: updateResponseTrackerDto,
    });
  }

  public async remove(id: number) {
    return await this.prisma.responseTracker.delete({ where: { id } });
  }
}
