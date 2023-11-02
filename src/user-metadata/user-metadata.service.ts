import { Injectable, NotFoundException } from "@nestjs/common";
import { TimeUnitsEnum, UserRolesEnum } from "@prisma/client";
import _ from "lodash";
import { MockUserService } from "../mockModules/mock-user/mock-user.service";
import { PrismaService } from "../prisma/prisma.service";
import { SurveyConfigService } from "../survey-config/survey-config.service";
import { UserMetadataFilterDto } from "./dto";
import { AdminDepartmentService } from "../admin-department/admin-department.service";

@Injectable()
export class UserMetadataService {
  constructor(
    private prisma: PrismaService,
    private mockUser: MockUserService,
    private surveyConfig: SurveyConfigService,
    private adminDepartmentService: AdminDepartmentService
  ) {}

  public async syncUserDataWithFrac() {
    // sync department data first before users because of table relation
    await this.adminDepartmentService.syncDepartmentData();

    // fetch all users
    const users = await this.mockUser.findAll();

    // update or create data in user metadata table
    const usersMetaDataPayload = await Promise.all(
      users.map(async (user) => {
        const { Department, createdAt, designation, id, role, userName } = user;

        const isNewEmployee = await this.isEmployeeNew(
          user.createdAt,
          user.Department!.id
        );

        const userMetadataPayload = {
          userId: id,
          userName: `${userName}_${id}`,
          departmentId: _.get(Department, "id", 0),
          designation,
          isNewEmployee,
          dateOfJoining: createdAt,
          isAdmin: role == _.get(UserRolesEnum, "ADMIN", "") ? true : false,
        };

        return await this.prisma.userMetadata.upsert({
          where: { userId: userMetadataPayload.userId },
          create: userMetadataPayload,
          update: userMetadataPayload,
        });
      })
    );

    return usersMetaDataPayload;
  }

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

  public async isEmployeeNew(
    dateOfJoining: Date,
    departmentId: number
  ): Promise<boolean> {
    const surveyConfig = await this.surveyConfig.getAllSurveyConfig({
      departmentId,
    });

    if (surveyConfig.length == 0) return true;

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
            createdAt: "asc",
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
                  select: {
                    userId: true,
                    userName: true,
                  },
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
