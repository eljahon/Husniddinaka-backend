import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { hashCompare } from '../../utils';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login({ first_name, phone_number }: AuthDto) {
    const user = await this.usersService.findByUsername(
      first_name,
      phone_number,
    );
    console.log(user, '====>>');

    if (!user) {
      // console.log(user, '====>>');
      throw new BadRequestException('username or password incorrect');
    }

    // const isPasswordValid = await hashCompare(first_name, user.phone_number);
    //
    // if (!isPasswordValid) {
    //   throw new BadRequestException('username or password incorrect');
    // }
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
