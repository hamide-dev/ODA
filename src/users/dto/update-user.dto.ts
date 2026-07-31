import { PartialType } from '@nestjs/mapped-types';
import { RegisterAdminDto } from '../../auth/dto/register-admin.dto';

export class UpdateUserDto extends PartialType(RegisterAdminDto) {}
