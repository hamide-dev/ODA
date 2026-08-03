import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SelectFormationDto } from 'src/formation/dto/select-formation';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/guards/roles.guard';
import { Role } from 'src/common/enums';
import { UpdateAuthDto } from 'src/auth/dto/update-auth.dto';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  async getProfile(@Request() req) {
    const userId = req.user.id || req.user.userId;
    return await this.usersService.getProfile(userId);
  }

  @Post('select-formation')
  async selectFormation(@Request() req, @Body() dto: SelectFormationDto) {
    const userId = req.user.id || req.user.userId;
    return await this.usersService.selectFormation(userId, dto);
  }

  @Post()
  @Roles(Role.ADMIN)
  async create(@Body() createUserDto: any) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  async findAll(@Query('search') search?: string) {
    return await this.usersService.findAllApprenants(search);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateAuthDto) {
    return await this.usersService.update(id, updateDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}
