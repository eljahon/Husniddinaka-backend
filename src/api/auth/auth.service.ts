import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { hashCompare } from '../../utils';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login({ username, password }) {
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await hashCompare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Passwordchayiz xato usernamiz to'g'ri");
    }
    const payload = { id: user.id };
    return {
      expiresIn: 86400,
      token: await this.jwtService.signAsync(payload),
    };
  }

  logout() {
    return 'This action logs a user out';
  }
}