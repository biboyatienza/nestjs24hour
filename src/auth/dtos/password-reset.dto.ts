import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class PasswordResetDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  email: string;
}