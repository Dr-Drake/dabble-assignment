import localDb from "@/databases/localDb";
import { CreateCountryDto } from "@/dtos/country.dto";
import { Country } from "@/interfaces/country.interface";
import { ICountryRepository } from "@/interfaces/country.repository.interface";

export default abstract class FakeCountryRepository implements ICountryRepository {
    
    countryFindAll(): Promise<Country[]> {
        return new Promise((resolve)=> resolve(localDb));
    }

    counyFindByName(name: string): Promise<Country> {
        let country = localDb.find((c)=> c.country === name )
        return new Promise((resolve)=> resolve(country));
    }
    
    countryCreate(country: CreateCountryDto): Promise<Country> {
        let newCountry: Country = {
            id: localDb.length + 2,
            ...country
        }
        localDb.push(newCountry);
        return new Promise((resolve)=> resolve(newCountry));
    }

    countryUpdate(name: string, country: CreateCountryDto): Promise<Country> {
        let result = localDb.find((c)=> c.country === name);
        let updatedCountry: Country = {
            ...result,
            ...country,
        }
        localDb.push(updatedCountry);
        return new Promise((resolve)=> resolve(updatedCountry));
    }

    countryDelete(name: string): Promise<Country> {
        let resultIndex = localDb.findIndex((c)=> c.country === name);
        let deletedCountry = localDb[resultIndex];

        // Remove country
        localDb.splice(resultIndex, 1);

        return new Promise((resolve)=> resolve(deletedCountry));
    }
    
}