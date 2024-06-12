import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/auth.dto';
import {ApiResponse, ApiTags } from '@nestjs/swagger';
// import { AuthGuard } from '../../guards/auth.guard';
// import { RegisterDto } from './dto/register.dto';
// import { CreateUserDto } from "../users/dto/create-user.dto";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Login Successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  async login(@Body() authDto: AuthDto) {
    console.log(authDto);
    return this.authService.login(authDto);
  }
}
