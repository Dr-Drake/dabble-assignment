import { CreateCountryDto } from "@/dtos/country.dto";
import { Country } from "@/interfaces/country.interface";
import FakeCountryRepository from "@/repositories/country.abstract.repository";
import { CountryTypeDef } from "@/typedefs/country.type";
import { mapCountryToTypeDef } from "@/utils/util";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class MockCountryResolver extends FakeCountryRepository{
    @Query(() => [CountryTypeDef], {
        description: 'Returns a list of countries',
    })
    
    public async getCountries(): Promise<CountryTypeDef[]> {
        const countries: Country[] = await this.countryFindAll();
        return countries.map((item)=> mapCountryToTypeDef(item));
    }

    @Query(() => [CountryTypeDef], {
        description: 'Returns a list of country filtered by a name search parameter',
    })
    
    public async getCountriesByName(@Arg('name') name: string): Promise<CountryTypeDef[]> {
        const countries: Country[] = await this.countryFindAllByName(name);
        return countries.map((item)=> mapCountryToTypeDef(item));
    }

    @Query(() => CountryTypeDef, {
        description: 'Returns a single country given the name',
    })
    
    public async getCountryByName(@Arg('name') name: string): Promise<CountryTypeDef> {
        const country: Country = await this.countryFindByName(name);
        return mapCountryToTypeDef(country);
    }

    @Mutation(() => CountryTypeDef, {
        description: 'Create Country',
    })
    public async createCountry(@Arg('countryData') countryData: CreateCountryDto): Promise<CountryTypeDef> {
        const country: Country = await this.countryCreate(countryData);
        return mapCountryToTypeDef(country);
    }

    @Mutation(() => CountryTypeDef, {
        description: 'Update Country',
    })
    public async updateCountry(@Arg('name') name: string, @Arg('countryData') countryData: CreateCountryDto): Promise<CountryTypeDef> {
        const country: Country = await this.countryUpdate(name, countryData);
        return mapCountryToTypeDef(country);
    }

    @Mutation(() => CountryTypeDef, {
        description: 'Delete Country',
    })
    public async deleteCountry(@Arg('name') name: string): Promise<CountryTypeDef> {
        const country: Country = await this.countryDelete(name);
        return mapCountryToTypeDef(country);
    }
} 