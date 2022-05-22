import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { SendgridService } from './sendgrid/sendgrid.service';
import { ImageModule } from './image/image.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, PrismaModule, EventEmitterModule.forRoot(), ImageModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, SendgridService],
})
export class AppModule {}
