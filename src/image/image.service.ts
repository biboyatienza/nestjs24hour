import { ForbiddenException, Injectable } from '@nestjs/common';
import { Image } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PatchImageDto, PatchImageSeriveDto, PostImageSeriveDto } from './dtos';
import { SingleImageType } from './types/single-image.type';

@Injectable()
export class ImageService {
  constructor(private readonly prismaService: PrismaService){}

  private async findImageByIdAndUserId(imageId: number, userId: number): Promise<Image>{
    const imageExists = await this.prismaService.image.findFirst({
      where: {
        AND: [
          { id: imageId },
          { creatorId: userId } //TODO:
        ] 
      }
    });
    return imageExists;
  }

  async getImages(max_limit: number): Promise<any>{}

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
        id: dto.userdId
      }
    });
    if(!userExists) throw new ForbiddenException ('User/Owner not exists.');

    await this.prismaService.image.create({
      data: {
        creatorId: dto.userdId,
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
