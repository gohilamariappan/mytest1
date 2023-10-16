import { PartialType } from '@nestjs/mapped-types';
import { CreateDepartmentDto } from './create-mock-department.dto';

export class UpdateDepartmentDto extends PartialType(CreateDepartmentDto) {}
