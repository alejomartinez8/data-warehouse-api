import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCountryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  regionId: number;
}
