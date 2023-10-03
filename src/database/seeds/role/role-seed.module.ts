import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Role } from 'src/roles/entities/role.entity';
import { RoleSeedService } from './role-seed.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  providers: [PrismaService, RoleSeedService],
  exports: [RoleSeedService],
})
export class RoleSeedModule {}
