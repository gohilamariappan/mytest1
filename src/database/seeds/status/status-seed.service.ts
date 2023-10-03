import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
import { PrismaService } from 'src/prisma/prisma.service';
// import { Status } from 'src/statuses/entities/status.entity';
// import { StatusEnum } from 'src/statuses/statuses.enum';
// import { Repository } from 'typeorm';

@Injectable()
export class StatusSeedService {
  constructor(
    private prisma: PrismaService
  ) {}

  async run() {
    const count = await this.prisma.status.count();

    if (!count) {
      await this.prisma.status.createMany({
        data: [
          {
            // id: StatusEnum.active,
            name: 'Active',
          },
          {
            // id: StatusEnum.inactive,
            name: 'Inactive',
          },
        ],
      });
    }
  }
}
