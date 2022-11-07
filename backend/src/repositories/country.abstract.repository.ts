import localDb from "@/databases/localDb";
import { CreateCountryDto } from "@/dtos/country.dto";
import { HttpException } from "@/exceptions/HttpException";
import { Country } from "@/interfaces/country.interface";
import { ICountryRepository } from "@/interfaces/country.repository.interface";

export default abstract class FakeCountryRepository implements ICountryRepository {
    
    countryFindAll(): Promise<Country[]> {
        return new Promise((resolve)=> resolve(localDb));
    }

    countryFindByName(name: string): Promise<Country> {
        let country = localDb.find((c)=> c.country === name );

        if (!country){
            throw new HttpException(404, 'Country not found'); 
        }
        return new Promise((resolve)=> resolve(country));
    }
    
    countryCreate(country: CreateCountryDto): Promise<Country> {

        // First check if country exists
        let countrySearch = localDb.find((c)=> c.country === country.country );

        if (countrySearch) {
            throw new HttpException(400, `Country with name ${country.country} already exists`);
        }

        let newCountry: Country = {
            id: localDb.length + 2,
            ...country
        }
        localDb.push(newCountry);
        return new Promise((resolve)=> resolve(newCountry));
    }

    countryUpdate(name: string, country: CreateCountryDto): Promise<Country> {
        let resultIndex = localDb.findIndex((c)=> c.country === name);

        // First check if country exists
        let countrySearch = localDb.find((c)=> c.country === country.country );

        if (countrySearch && countrySearch.country !== name) {
            throw new HttpException(400, `Country with name ${country.country} already exists`);
        }

        let prevCountry = localDb[resultIndex];

        let updatedCountry: Country = {
           ...prevCountry,
            ...country,
        }
        localDb[resultIndex] = (updatedCountry);
        return new Promise((resolve)=> resolve(updatedCountry));
    }

    countryDelete(name: string): Promise<Country> {
        let resultIndex = localDb.findIndex((c)=> c.country === name);

        if (resultIndex === -1) {
            throw new HttpException(404, 'Country not found'); 
        }
        let deletedCountry = localDb[resultIndex];

        // Remove country
        localDb.splice(resultIndex, 1);

        return new Promise((resolve)=> resolve(deletedCountry));
    }
    
}