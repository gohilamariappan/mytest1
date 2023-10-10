import { PartialType } from '@nestjs/mapped-types';
import { CreateResponseTrackerDto } from './create-response-tracker.dto';

export class UpdateResponseTrackerDto extends PartialType(CreateResponseTrackerDto) {}
