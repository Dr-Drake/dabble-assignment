import { Country } from "@/interfaces/country.interface";
import CountryRepository from "@/repositories/country.repository";
import { CountryTypeDef } from "@/typedefs/country.type";
import { mapCountryToTypeDef } from "@/utils/util";
import { Query, Resolver } from "type-graphql";

@Resolver()
export class CountryResolver extends CountryRepository{
    @Query(() => [CountryTypeDef], {
        description: 'Returns a list of countries',
    })
    
    public async getCountries(): Promise<CountryTypeDef[]> {
        const countries: Country[] = await this.countryFindAll();
        return countries.map((item)=> mapCountryToTypeDef(item));
    }
} 