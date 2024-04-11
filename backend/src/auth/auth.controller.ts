import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() userData: User) {
    return this.authService.signIn(userData);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  signUp(@Body() userData: User) {
    return this.authService.signUp(userData);
  }
}
