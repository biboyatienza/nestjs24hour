import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class PostImageDto {
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  uri: string;

  owner: number;
}