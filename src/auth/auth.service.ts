import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Token } from './types';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto, PasswordNewDto, PasswordResetDto, RegisterDto } from './dtos';


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

  async registerLocal(dto: RegisterDto): Promise<Token> {

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

  async loginLocal(dto: LoginDto): Promise<Token> {
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

  async passwordResetLocal(dto: PasswordResetDto): Promise<boolean> {
    const userFound = await this.prismaService.user.findUnique({
      where: {
        email: dto.email
      },
    });

    if (!userFound) throw new ForbiddenException('Email does not exists.');

    const hashPasswordResetToken = await this.hashData(userFound.passwordHash);
    await this.prismaService.user.updateMany({
      where: {
        id: userFound.id
      },
      data: {
        passwordResetToken: hashPasswordResetToken,
        updatedAt: new Date()
      },
    });
    return true;
  }
  
async passwordNewLocal(dto: PasswordNewDto): Promise<Token> {
  const userFound = await this.prismaService.user.findFirst({
    where: {
      passwordResetToken : dto.password_reset_token
    }
  });

  if (!userFound) throw new ForbiddenException('Invalid password reset token.');

  const hashNewPassword = await this.hashData(dto.new_password); 

  await this.prismaService.user.updateMany({
    where: {
      id: userFound.id
    },
    data: {
      passwordHash: hashNewPassword,
      passwordResetToken: '',
      updatedAt: new Date()
    },
  });

  const token = await this.getToken(userFound.id, userFound.email);
  return token;
 }
}
