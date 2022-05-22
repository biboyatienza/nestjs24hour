import { IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";

export class PatchImageDto {
  @IsNumber()
  hits: number;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  uri: string;
}