import { CreateCountryDto } from "@/dtos/country.dto";
import { Country } from "./country.interface";

export interface ICountryRepository{
    countryFindAll(): Promise<Country[]>;
    countryFindByName(name: string): Promise<Country>;
    countryCreate(country: CreateCountryDto): Promise<Country>;
    countryUpdate(name: string, country: CreateCountryDto): Promise<Country>;
    countryDelete(name: string): Promise<Country>;
}