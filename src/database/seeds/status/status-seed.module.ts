import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Status } from 'src/statuses/entities/status.entity';
import { StatusSeedService } from './status-seed.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  providers: [PrismaService, StatusSeedService],
  exports: [StatusSeedService],
})
export class StatusSeedModule {}
