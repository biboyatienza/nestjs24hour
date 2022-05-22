import { Controller, Delete, ForbiddenException, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetCurrentUserDecorator } from 'src/auth/decorators';
import { PatchImageDto, PatchImageSeriveDto, PostImageSeriveDto } from './dtos';
import { PostImageDto } from './dtos/post-image.dto';
import { ImageService } from './image.service';
import { SingleImageType } from './types/single-image.type';

@Controller('images')
@UseGuards(AuthGuard('jwt'))
export class ImageController {
  constructor(private readonly imageService: ImageService){}

  @Get()
  @HttpCode(HttpStatus.OK)
  getImages(
    @Query('limit') limit: number=10,
    @GetCurrentUserDecorator('sub') userId: number 
    ): string {
    const max_limit = limit >= 10 ? 10 : limit;
    const r = this.imageService.getImages(max_limit, userId);
    return "PROTECTED images/ route, login is required to see this." + max_limit.toString() + ' user => ' + userId.toString() + 'RoLE: ';
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getImage(
    @Param('id') id: string,
    @GetCurrentUserDecorator('sub') userId: number
    ): Promise<SingleImageType> {
    const imageId = Number(id);
    if(isNaN(imageId)) throw new ForbiddenException('Invalid image id.');
    return this.imageService.getImage(imageId, userId);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async patchImage(
    @Param('id') id: string,
    @GetCurrentUserDecorator('sub') userId: number, 
    dto: PatchImageDto
    ): Promise<boolean> {
    const imageId = Number(id);
    if(isNaN(imageId)) throw new ForbiddenException('Invalid image id.');
    return this.imageService.patchImage(new PatchImageSeriveDto(imageId, userId, dto.hits, dto.uri));
  }


  @Post(':id')
  @HttpCode(HttpStatus.OK)
  async postImage(
    @Param('id') id: string,
    @GetCurrentUserDecorator('sub') userId: number, 
    dto: PostImageDto
    ): Promise<boolean> {
    const imageId = Number(id);
    if(isNaN(imageId)) throw new ForbiddenException('Invalid image id.');
    return this.imageService.postImage(new PostImageSeriveDto(
      imageId, 
      userId,
      isNaN(dto.owner) ? userId : dto.owner, 
      dto.uri));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteImage(@Param('id') id: string): Promise<boolean>{
    const imageId = Number(id);
    if(isNaN(imageId)) throw new ForbiddenException('Invalid image id.');
    return this.imageService.deleteImage(imageId);
  }  
}
