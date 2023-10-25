import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports : [PrismaModule],
  controllers: [FileUploadController],
  providers: [FileUploadService, PrismaService],
  exports : [FileUploadService]
})
export class FileUploadModule {}
