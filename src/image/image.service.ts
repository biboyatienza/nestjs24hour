import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Image, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PatchImageSeriveDto, PostImageSeriveDto } from './dtos';
import { SingleImageType } from './types/single-image.type';

@Injectable()
export class ImageService {
  constructor(private readonly prismaService: PrismaService, private readonly httpService: HttpService){}

  private async getUserRole(userId: number): Promise<string>{
    const currentUser = await this.prismaService.user.findFirst({
      where: {
        id: userId
      }
    });
    return currentUser.role === 'ADMIN' ? 'ADMIN' : 'USER'; 
  }

  private async findImageByIdAndUserId(imageId: number, userId: number): Promise<Image>{
    const role = await this.getUserRole(userId);

    if(role==='ADMIN')
      return await this.prismaService.image.findFirst({
        where: {
            id: imageId
        }
      });
      
    return await this.prismaService.image.findFirst({
      where: {
        AND: [
          { id: imageId },
          { creatorId: userId },
          { softDeletedAt: null }
        ] 
      }
    });
  }

  async getImages(max_limit: number, userId: number): Promise<string>{
    const role = await this.getUserRole(userId);
    return role;
  }

  async getImage(imageId: number, userId: number): Promise<SingleImageType>{
    const imageExists = await this.findImageByIdAndUserId(imageId, userId);
    if(!imageExists) throw new ForbiddenException ('Image not exists.');

    imageExists.hits++;
    await this.prismaService.image.updateMany({
      where: {
        id: imageId
      },
      data: {
        hits: imageExists.hits
      },
    });

    return {
      id: imageExists.id,
      hits: imageExists.hits,
      uri: imageExists.uri
    };
  }

  async patchImage(dto: PatchImageSeriveDto): Promise<boolean>{
    const imageExists = await this.findImageByIdAndUserId(dto.id, dto.userdId);
    if(!imageExists) throw new ForbiddenException ('Image not exists.');

    await this.prismaService.image.updateMany({
      where: {
        id: dto.id
      },
      data: {
        hits: dto.hits,
        uri: dto.uri
      },
    });

    return true;
  }

  async postImage(dto: PostImageSeriveDto): Promise<boolean>{
    const userExists = await this.prismaService.user.findFirst({
      where: {
        id: dto.owner
      }
    });
    if(!userExists) throw new ForbiddenException ('User/Owner not exists.');

    await this.prismaService.image.create({
      data: {
        creatorId: dto.owner,
        uri: dto.uri
      }      
    });

    return true;
  }

  async deleteImage(imageId: number): Promise<boolean>{
    const imageExists = await this.prismaService.image.findFirst({
      where: { 
        id: imageId }
    });
    if(!imageExists) throw new ForbiddenException ('Image not exists.');

    await this.prismaService.image.updateMany({
      where: {
        id: imageId
      },
      data: {
        softDeletedAt: new Date()
      },
    });

    return true;
  }
}
