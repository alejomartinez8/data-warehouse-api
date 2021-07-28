import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsArray,
  IsOptional,
} from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  position: string;

  @IsString()
  interest: string;

  @IsString()
  cityId: string;

  @IsString()
  companyId: string;

  @IsArray()
  @IsOptional()
  channels?: { channelId: string; account: string; preference: string }[];
}
