import { Injectable, NotFoundException } from "@nestjs/common";
import { TimeUnitsEnum, UserRolesEnum } from "@prisma/client";
import { MockUserService } from "src/mockModules/mock-user/mock-user.service";
import { PrismaService } from "src/prisma/prisma.service";
import { SurveyConfigService } from "src/survey-config/survey-config.service";
import { UserMetadataFilterDto } from "./dto";

@Injectable()
export class UserMetadataService {
  constructor(
    private prisma: PrismaService,
    private mockUser: MockUserService,
    private surveyConfig: SurveyConfigService
  ) {}

  async createOrUpdateUserMetadata(userId: string) {
    let userMetadata = await this.prisma.userMetadata.findUnique({
      where: { userId },
      select: this.metadataSelect,
    });
    const user = await this.mockUser.findOne(userId);
    const isNewEmployee = await this.isEmployeeNew(
      user.createdAt,
      user.Department!.id
    );
    const userObj = {
      userId: user.id,
      userName: user.userName,
      isNewEmployee: isNewEmployee,
      dateOfJoining: user.createdAt,
      isAdmin: user.role == UserRolesEnum.ADMIN ? true : false,
      departmentId: user.Department!.id,
      designation: user.designation,
    };

    if (!userMetadata) {
      userMetadata = await this.prisma.userMetadata.create({
        data: userObj,
        select: this.metadataSelect,
      });
    } else {
      if (userMetadata !== userObj) {
        userMetadata = await this.prisma.userMetadata.update({
          where: { userId },
          data: {
            isNewEmployee: isNewEmployee,
            dateOfJoining: user.createdAt,
            isAdmin: user.role == UserRolesEnum.ADMIN ? true : false,
            departmentId: user.Department!.id,
            designation: user.designation,
          },
          select: this.metadataSelect,
        });
      }
    }
    return userMetadata;
  }

  async findUserMetadataById(userId: string) {
    const userMetadata = await this.prisma.userMetadata.findUnique({
      where: { userId },
      select: this.metadataSelect,
    });
    if (!userMetadata)
      throw new NotFoundException(
        `UserMetadata for user with id #${userId} not found`
      );
    return userMetadata;
  }

  async findManyUserMetadata(filter: UserMetadataFilterDto) {
    const {
      isAdmin,
      isNewEmployee,
      departmentId,
      designation,
      limit = 10,
      offset = 0,
    } = filter;
    return await this.prisma.userMetadata.findMany({
      where: {
        isAdmin: isAdmin ?? undefined,
        isNewEmployee: isNewEmployee ?? undefined,
        departmentId: departmentId ?? undefined,
        designation: designation ?? undefined,
      },
      skip: +offset,
      take: +limit,
      select: this.metadataSelect,
    });
  }

  async deleteUserMetadata(userId: string) {
    return await this.prisma.userMetadata.delete({
      where: { userId },
      select: this.metadataSelect,
    });
  }

  async isEmployeeNew(
    dateOfJoining: Date,
    departmentId: number
  ): Promise<boolean> {
    const surveyConfig = await this.surveyConfig.getAllSurveyConfig({
      departmentId,
    });

    if (surveyConfig.length == 0)
      throw new NotFoundException(
        `Survey Config for the department with Id #${departmentId} not found.`
      );

    let dateToBeCompared = new Date(dateOfJoining);
    const today = new Date();
    const { onboardingTime, onboardingTimeUnit } = surveyConfig[0];

    if (onboardingTimeUnit === TimeUnitsEnum.DAY) {
      dateToBeCompared.setDate(dateToBeCompared.getDate() + onboardingTime);
    } else if (onboardingTimeUnit === TimeUnitsEnum.MONTH) {
      dateToBeCompared.setMonth(dateToBeCompared.getMonth() + onboardingTime);
    } else {
      dateToBeCompared.setFullYear(
        dateToBeCompared.getFullYear() + onboardingTime
      );
    }

    return dateToBeCompared <= today;
  }

  async getSurveyFormsByUserId(userId: string) {
    const userMetadata = await this.prisma.userMetadata.findUnique({
      where: {
        userId,
      },
      select: {
        userId: true,
        dateOfJoining: true,
        departmentId: true,
        designation: true,
        isNewEmployee: true,
        SurveyForm: {
          orderBy: {
            createdAt: "asc"
          },
          select: {
            id: true,
            surveyCycleParameterId: true,
            questionsJson: true,
            status: true,
            overallScore: true,
            sunbirdCredentialIds: true,
            ResponseTracker: {
              select: {
                id: true,
                Assessor: {
                    select:{
                        userId: true,
                        userName: true,
                    }
                },
                responseJson: true,
                status: true,
              },
            },
          },
        },
      },
    });
    if (!userMetadata)
      throw new NotFoundException(
        `UserMetadata for user with id #${userId} not found`
      );
    return userMetadata;
  }

  metadataSelect = {
    userId: true,
    userName: true,
    dateOfJoining: true,
    departmentId: true,
    isAdmin: true,
    designation: true,
    isNewEmployee: true,
  };
}
