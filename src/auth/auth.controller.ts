import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post('local/register')
  registerLocal() {
    this.authService.registerLocal()
  }

  @Post('local/login')
  loginLocal() {
    this.authService.loginLocal()
  }

  @Post('local/password-reset')
  passwordResetLocal() {
    this.authService.passwordResetLocal()
  }
}
