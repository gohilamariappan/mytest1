import { PartialType } from '@nestjs/swagger';
import { CreateAdminDepartmentDto } from './create-admin-department.dto';

export class UpdateAdminDepartmentDto extends PartialType(CreateAdminDepartmentDto) {}
