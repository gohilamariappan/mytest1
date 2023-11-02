import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from "@nestjs/common";
import _ from "lodash";
import { PrismaService } from "src/prisma/prisma.service";
import { MockCompetencyService } from "../mockModules/mock-competency/mock-competency.service";
import { UpdateAdminCompetencyDto } from "./dto";

@Injectable()
export class AdminCompetencyService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => MockCompetencyService))
    private mockCompetencyService: MockCompetencyService
  ) {}

  public async syncCompetencyData() {
    const competenciesData =
      await this.mockCompetencyService.findAllCompetenciesWithLevelNames();

    const response = await Promise.all(
      _.map(competenciesData, async (data) => {
        const { competencyLevels, description, id, name } = data;
        const competencyLevelData = _.map(
          competencyLevels,
          (competencyLevelData) => {
            const { levelNumber, name } =
              competencyLevelData?.competencyLevel || {};
            return {
              competencyLevelNumber: levelNumber,
              competencyLevelName: name,
            };
          }
        );
        const adminCompetencyPayload = {
          id,
          competencyLevels: JSON.parse(JSON.stringify(competencyLevelData)),
          competencyId: id,
          name,
          description,
        };

        return await this.prisma.adminCompetency.upsert({
          where: {
            id_competencyId: {
              id: adminCompetencyPayload.id,
              competencyId: adminCompetencyPayload.competencyId,
            },
          },
          update: adminCompetencyPayload,
          create: adminCompetencyPayload,
        });
      })
    );
    return response;
  }

  public async findAll() {
    const adminCompetency = await this.prisma.adminCompetency.findMany();
    return adminCompetency;
  }

  public async findOne(id: number, competencyId: number) {
    const adminCompetency = await this.prisma.adminCompetency.findUnique({
      where: {
        id_competencyId: {
          id,
          competencyId,
        },
      },
    });
    if (!adminCompetency)
      throw new NotFoundException(
        `Admin competency with id #${id} and competency id #${competencyId} not found `
      );
    return adminCompetency;
  }

  public async update(
    id: number,
    competencyId: number,
    updateAdminCompetencyDto: UpdateAdminCompetencyDto
  ) {
    const competencyLevels = JSON.stringify(
      updateAdminCompetencyDto?.competencyLevels
    );

    let payload = {
      ...updateAdminCompetencyDto,
      competencyLevels: JSON.parse(competencyLevels || "[]"),
    };

    if (!competencyLevels) {
      delete payload.competencyLevels;
    }

    return await this.prisma.adminCompetency.update({
      where: {
        id_competencyId: {
          id,
          competencyId,
        },
      },
      data: payload,
    });
  }

  public async remove(id: number, competencyId: number) {
    const adminCompetency = await this.prisma.adminCompetency.delete({
      where: {
        id_competencyId: {
          id,
          competencyId,
        },
      },
    });
    return adminCompetency;
  }
}
