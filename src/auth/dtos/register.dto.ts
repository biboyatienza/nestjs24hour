import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'Password too weak'})
  password: string;
}