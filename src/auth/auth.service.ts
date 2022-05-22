import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dtos';
import * as bcrypt from 'bcrypt';
import { Token } from './types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService, private jwtService: JwtService){}

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async getToken(id: number, email: string) {
    const accessToken = await this.jwtService.signAsync(
      {
        sub: id,
        email
      },
      {
        secret: 'TOKEN_SECRET',
        expiresIn: 60 * 15
      }
    );
    
    return {
      access_token: accessToken
    };

 }

  async registerLocal(dto: AuthDto): Promise<Token> {
    const hashPassword = await this.hashData(dto.password); 
    const newUser = await this.prismaService.user.create({
      data: {
        email: dto.email,
        passwordHash: hashPassword
      }      
    })
    
    const token = await this.getToken(newUser.id, newUser.email);
    return token;
  }

  loginLocal() {}
  passwordResetLocal() {}  
}
