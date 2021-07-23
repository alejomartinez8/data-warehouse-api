import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCityDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  countryId: number;
}
