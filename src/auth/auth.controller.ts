import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { PasswordResetDto, RegisterDto } from './dtos';
import { LoginDto } from './dtos/login.dto';
import { PasswordNewDto } from './dtos/password-new.dto';
import { Token } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  registerLocal(@Body() dto: RegisterDto): Promise<Token> {
    return this.authService.registerLocal(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  loginLocal(@Body() dto: LoginDto): Promise<Token> {
    return this.authService.loginLocal(dto);
  }

  @Post('password-reset')
  @HttpCode(HttpStatus.OK)
  passwordResetLocal(@Body() dto: PasswordResetDto): Promise<boolean> {
    return this.authService.passwordResetLocal(dto);
  }

  @Post('password-new')
  @HttpCode(HttpStatus.OK)
  passwordNewLocal(@Body() dto: PasswordNewDto): Promise<Token> {
    return this.authService.passwordNewLocal(dto);
  }

}
