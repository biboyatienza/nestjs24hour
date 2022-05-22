import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dtos';
import * as bcrypt from 'bcrypt';
import { Token } from './types';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { use } from 'passport';


@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService, private jwtService: JwtService, private configService: ConfigService){}

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
        // secret: this.configService.get<string>('SECRET_OR_KEY'),
        secret: 'TOKEN_SECRET',
        expiresIn: 60 * 15
      }
    );
    
    return {
      access_token: accessToken
    };
 }

  async registerLocal(dto: AuthDto): Promise<Token> {

    const userExists = await this.prismaService.user.findUnique({
      where: {
        email: dto.email
      }
    });
    if(userExists) throw new ForbiddenException('Email already registed.');


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

  async loginLocal(dto: AuthDto): Promise<Token> {
   const user = await this.prismaService.user.findUnique({
     where: {
       email: dto.email
     }
   });
   
   if(!user) throw new ForbiddenException('Access Denied');

   const passwordMatches = await bcrypt.compare(dto.password, user.passwordHash);
   if(!passwordMatches) throw new ForbiddenException('Access Denied');

   const token = await this.getToken(user.id, user.email);
   return token;

  }
  passwordResetLocal() {}  
}
