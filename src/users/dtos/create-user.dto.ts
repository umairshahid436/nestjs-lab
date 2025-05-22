import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name: string;
  @IsEmail()
  @IsOptional()
  email: string;
}
