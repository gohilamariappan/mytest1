import { Module } from '@nestjs/common';
import { UserMetadataController } from './user-metadata.controller';
import { UserMetadataService } from './user-metadata.service';

@Module({
  controllers: [UserMetadataController],
  providers: [UserMetadataService]
})
export class UserMetadataModule {}
