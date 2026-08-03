import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from 'src/users/dto/create-user.dto';
import { Role } from 'src/common/enums';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const cleanEmail = registerDto.email.trim().toLowerCase();

    return await this.usersService.create({
      ...registerDto,
      email: cleanEmail,
      password: hashedPassword,
      role: Role.APPRENANT,
    });
  }

  async loginUser(loginDto: LoginDto) {
    const cleanEmail = loginDto.email.trim().toLowerCase();

    const user = await this.usersService.findByEmailWithPassword(cleanEmail);

    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Identifiants incorrects');
    }

    if (user.role !== Role.APPRENANT) {
      throw new ForbiddenException(
        'Veuillez utiliser le portail d administration',
      );
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: {
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        age: user.age,
        numero: user.numero,
        sexe: user.sexe,
        role: user.role,
        formation: user.formation || null,
      },
    };
  }

  async loginAdmin(loginDto: LoginDto) {
    const user = await this.usersService.findByEmailWithPassword(
      loginDto.email,
    );

    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Identifiants incorrects');
    }

    if (user.role !== Role.ADMIN) {
      throw new ForbiddenException(
        "Accès refusé : Vous n'avez pas les privilèges administrateur",
      );
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      admin: {
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role,
        permissions: ['ALL'],
      },
    };
  }
}
