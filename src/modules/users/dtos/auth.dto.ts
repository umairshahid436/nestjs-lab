import { IsAlphanumeric, IsEmail, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsAlphanumeric()
  password: string;
  confirmPassword: string;
}

export class LoginDto {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
