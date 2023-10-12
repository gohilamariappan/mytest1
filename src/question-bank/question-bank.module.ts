import { Module } from '@nestjs/common';
import { QuestionBankService } from './question-bank.service';
import { QuestionBankController } from './question-bank.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  // Import the PrismaModule to make Prisma service available within this module
  imports: [PrismaModule],

  // Declare the QuestionBankController as a controller for this module
  controllers: [QuestionBankController],

  // Declare the QuestionBankService and PrismaService as providers for this module
  providers: [QuestionBankService, PrismaService],

  // Export the QuestionBankService to make it available for other modules that import this module
  exports: [QuestionBankService],
})
export class QuestionBankModule {}
