import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsOptional } from 'class-validator';
import { CreateCountryDto } from './create-country.dto';

export class UpdateCountryDto extends PartialType(CreateCountryDto) {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  regionId?: string;
}
