import { PrismaClient } from "@prisma/client";
import { competencies } from "./data/mock-competencies.data";
import { competencyLevels } from "./data/mock-competencyLevels.data";
import { departments } from "./data/mock-departments.data";
import { designations } from "./data/mock-designation.data";
import { levels } from "./data/mock-levels.data";
import { roles } from "./data/mock-roles.data";
import { users } from "./data/mock-users.data";
import { competenciesToCompetencyLevels } from "./data/mock-competenciesToCompetencyLevels.data";
import { rolesToCompetencies } from "./data/mock-rolesToCompetencies.data";

const prisma = new PrismaClient();

//  1-  Department ------
//  2-  Designation --------
//  3-  Role ---------
//  4-  Level =========
//  5-  Competency Level =========
//  6-  Competency  ========
//  7-  Competency to  Competency Level =========
//  8-  RoleToCompetency ============
//  9-  User  ------

async function seed() {
  await prisma.$transaction([
    prisma.department.createMany({
      data: departments,
    }),

    prisma.designation.createMany({
      data: designations,
    }),

    prisma.role.createMany({
      data: roles,
    }),

    prisma.level.createMany({
      data: levels,
    }),

    prisma.competencyLevel.createMany({
      data: competencyLevels,
    }),

    prisma.competency.createMany({
      data: competencies,
    }),

    prisma.competencyToCompetencyLevel.createMany({
      data: competenciesToCompetencyLevels,
    }),

    prisma.roleToCompetency.createMany({
      data: rolesToCompetencies,
    }),

    prisma.user.createMany({
      data: users,
    }),
  ]);
}

seed()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
