import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
import { PrismaService } from 'src/prisma/prisma.service';
// import { Role } from 'src/roles/entities/role.entity';
import { RoleEnum } from 'src/roles/roles.enum';
// import { Repository } from 'typeorm';

@Injectable()
export class RoleSeedService {
  constructor(
    private prisma: PrismaService
  ) {}

  async run() {
    const countUser = await this.prisma.role.count({
      where: {
        id: RoleEnum.user,
      },
    });

    if (!countUser) {
      await this.prisma.role.create({
        data: {
          id: RoleEnum.user,
          name: 'User',
        },
      });
    }

    const countAdmin = await this.prisma.role.count({
      where: {
        id: RoleEnum.admin,
      },
    });

    if (!countAdmin) {
      await this.prisma.role.create({
        data: {
          id: RoleEnum.admin,
          name: 'Admin',
        },
      });
    }
  }
}
