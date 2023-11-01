import { PrismaClient } from "@prisma/client";
import { users } from "./data/mock-users.data";
import { roles } from "./data/mock-roles.data";
import { departments } from "./data/mock-departments.data";
import { designations } from "./data/mock-designation.data";

const prisma = new PrismaClient();

async function seed() {
  await prisma.$transaction([
    prisma.user.createMany({
      data: users,
    }),

    prisma.role.createMany({
      data: roles,
    }),

    prisma.department.createMany({
      data: departments,
    }),

    prisma.designation.createMany({
      data: designations,
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
