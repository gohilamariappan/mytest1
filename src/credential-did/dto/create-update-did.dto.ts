import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUpdateDIDDto {
  @ApiProperty({ required: false, description: 'Author DID' })
  @IsNotEmpty()
  authorDid: string;

  @ApiProperty({ required: false, description: 'Schema DID' })
  @IsNotEmpty()
  schemaDid: string;

  @ApiProperty({ required: false, description: 'Schema DID' })
  @IsNotEmpty()
  schemaVersion: string;
}