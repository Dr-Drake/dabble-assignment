import { Country } from '@/interfaces/country.interface';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateCountryDto implements Partial<Country> {
  @Field()
  @IsString()
  @IsNotEmpty()
  country: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  year: string;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  area: number;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  total_population: number;
}
