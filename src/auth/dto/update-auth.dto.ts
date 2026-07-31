import { PartialType } from '@nestjs/mapped-types';
import { RegisterAdminDto } from './register-admin.dto';

export class UpdateAuthDto extends PartialType(RegisterAdminDto) {}
