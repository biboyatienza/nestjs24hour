import { IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class PasswordNewDto {
  @IsNotEmpty()
  @IsString()
  password_reset_token: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
   @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'Password too weak'})
  new_password: string;
}