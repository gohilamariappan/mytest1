import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from "@nestjs/common";
import { FileUploadService } from "../file-upload/file-upload.service";
import { PrismaService } from "../prisma/prisma.service";
import {
  CreateSurveyConfigDto,
  SurveyConfigFilterDto,
  UserMappingFileUploadDto,
} from "./dto/create-survey-config.dto";
import { UpdateSurveyConfigDto } from "./dto/update-survey-config.dto";
import { UserMetadataService } from "../user-metadata/user-metadata.service";

@Injectable()
export class SurveyConfigService {
  constructor(
    private prisma: PrismaService,
    private fileUploadService: FileUploadService,
    @Inject(forwardRef(() => UserMetadataService))
    private userMetadataService: UserMetadataService
  ) {}
  async createSurveyConfig(
    filepath,
    createSurveyConfigDto: CreateSurveyConfigDto
  ) {
    let newConfig;
    let userIdList: Set<string> = new Set();
    try {
      await this.prisma.$transaction(async (prismaClient) => {
        newConfig = await prismaClient.surveyConfig.create({
          data: {
            surveyName: createSurveyConfigDto.surveyName,
            endTime: createSurveyConfigDto.endTime,
            startTime: createSurveyConfigDto.startTime,
          },
        });

        const parsedData = await this.fileUploadService.parseCSV(filepath);

        for (const obj of parsedData) {
          obj.assessorIds = obj.assessorIds.split(", ");

          const userMapping: UserMappingFileUploadDto = obj;

          try {
            userIdList = await this.userMetadataService.validateAndFetchUserIds(
              prismaClient,
              userIdList,
              userMapping
            );
          } catch (error) {
            throw error;
          }

          await prismaClient.userMapping.create({
            data: {
              surveyConfigId: newConfig.id,
              assesseeId: userMapping.assesseeId,
              assessorIds: userMapping.assessorIds,
            },
          });
        }
      });
      await this.fileUploadService.deleteUploadedFile(filepath);
    } catch (error) {
      await this.fileUploadService.deleteUploadedFile(filepath);
      throw error;
    }

    return newConfig;
  }

  async getAllSurveyConfig(filter: SurveyConfigFilterDto) {
    const { configId, startTime, endTime, limit, offset } = filter;
    return await this.prisma.surveyConfig.findMany({
      where: {
        id: configId ?? undefined,
        startTime: startTime ?? undefined,
        endTime: endTime ?? undefined,
      },
      skip: offset ?? undefined,
      take: limit ?? undefined,
    });
  }

  async updateSurveyConfigById(
    surveyConfigId: number,
    updateSurveyConfig: UpdateSurveyConfigDto,
    filepath = null
  ) {
    let updatedConfig;
    let userIdList: Set<string> = new Set();
    // Check the document available for the given surveyId in database to update.
    const findSurveyConfigId = await this.prisma.surveyConfig.findUnique({
      where: {
        id: surveyConfigId,
      },
    });
    if (!findSurveyConfigId) {
      throw new NotFoundException(
        `Survey config with ID ${findSurveyConfigId} not found.`
      );
    }
    // Update the survey config by the id
    try {
      await this.prisma.$transaction(async (prismaClient) => {
        if (filepath != null) {
          const parsedData = await this.fileUploadService.parseCSV(filepath);

          for (const obj of parsedData) {
            obj.assessorIds = obj.assessorIds.split(", ");

            const userMapping: UserMappingFileUploadDto = obj;

            try {
              userIdList = await this.userMetadataService.validateAndFetchUserIds(
                prismaClient,
                userIdList,
                userMapping
              );
            } catch (error) {
              throw error;
            }

            await prismaClient.userMapping.create({
              data: {
                surveyConfigId: updatedConfig.id,
                assesseeId: userMapping.assesseeId,
                assessorIds: userMapping.assessorIds,
              },
            });
          }

          delete updateSurveyConfig.file;
          await this.fileUploadService.deleteUploadedFile(filepath);
        }

        updatedConfig = await this.prisma.surveyConfig.update({
          where: {
            id: surveyConfigId,
          },
          data: updateSurveyConfig,
        });
      });
    } catch (error) {
      throw error;
    }
    return updatedConfig;
  }

  async deleteSurveyConfig(surveyConfigId: number) {
    // Find the survey config with the provided Id and check it exists or not before deleting
    const isExisted = await this.prisma.surveyConfig.findFirst({
      where: {
        id: surveyConfigId,
      },
    });
    if (!isExisted) {
      throw new NotFoundException(
        `The survey Config ID ${surveyConfigId} doesn't exist.`
      );
    }
    // Delete a single survey configuration based on its unique identifier (id).
    const deletedSurveyConfig = await this.prisma.surveyConfig.delete({
      where: {
        id: surveyConfigId,
      },
    });
    return deletedSurveyConfig;
  }
}
