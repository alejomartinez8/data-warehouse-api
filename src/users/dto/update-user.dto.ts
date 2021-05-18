import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto, Role } from './create-user.dto';
import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsOptional()
  role: Role;

  @IsString()
  @IsOptional()
  @MinLength(6)
  password: string;
}
