import { IsEmail, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export interface IContact {
  channelId: string;
  account: string;
  preference: string;
}

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  position?: string;

  @IsString()
  @IsOptional()
  interest?: string;

  @IsString()
  @IsOptional()
  cityId?: string;

  @IsString()
  @IsOptional()
  companyId?: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsString()
  @IsOptional()
  cloudinaryId?: string;

  @IsOptional()
  channels?: IContact[] | string;
}
