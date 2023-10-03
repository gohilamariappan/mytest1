import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from 'src/users/entities/user.entity';
import { UserSeedService } from './user-seed.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  providers: [UserSeedService, PrismaService],
  exports: [UserSeedService],
})
export class UserSeedModule {}
