import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsOptional, IsNumber } from 'class-validator';
import { CreateCountryDto } from './create-country.dto';

export class UpdateCountryDto extends PartialType(CreateCountryDto) {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  regionId: number;
}
