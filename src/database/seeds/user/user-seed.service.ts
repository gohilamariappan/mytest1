import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
import { PrismaService } from 'src/prisma/prisma.service';
// import { RoleEnum } from 'src/roles/roles.enum';
// import { StatusEnum } from 'src/statuses/statuses.enum';
// import { User } from 'src/users/entities/user.entity';
// import { Repository } from 'typeorm';

@Injectable()
export class UserSeedService {
  constructor(
    private prisma: PrismaService
  ) {}

  async run() {
    const countAdmin = await this.prisma.user.count({
      where: {
        role: {
          // id: RoleEnum.admin,
        },
      },
    });

    if (!countAdmin) {
      await this.prisma.user.create({
        data: {
          firstName: 'Super',
          lastName: 'Admin',
          email: 'admin@example.com',
          password: 'secret',
          role: {
            connect: {
              // id: RoleEnum.admin,
            }
          },
          status: {
            connect: {
              // id: StatusEnum.active,
            }
          },
        },
      });
    }

    const countUser = await this.prisma.user.count({
      where: {
        role: {
          // id: RoleEnum.user,
        },
      },
    });

    if (!countUser) {
      await this.prisma.user.create({
        data: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          password: 'secret',
          role: {
            connect: {
              // id: RoleEnum.user,
            }
          },
          status: {
            connect: {
              // id: StatusEnum.active,
            }
          },
        },
      });
    }
  }
}
