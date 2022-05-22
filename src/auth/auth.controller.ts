import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos';
import { Token } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post('register')
  registerLocal(@Body() dto: AuthDto): Promise<Token> {
    return this.authService.registerLocal(dto);
  }

  @Post('login')
  loginLocal() {
    this.authService.loginLocal()
  }

  @Post('password-reset')
  passwordResetLocal() {
    this.authService.passwordResetLocal()
  }
}
