import { EntityRepository, Like } from 'typeorm';
import { ICountryRepository } from '@/interfaces/country.repository.interface';
import { Country } from '@/interfaces/country.interface';
import { CreateCountryDto } from '@/dtos/country.dto';
import { CountryEntity } from '@/entities/country.entity';
import { HttpException } from '@/exceptions/HttpException';


@EntityRepository()
export default class CountryRepository implements ICountryRepository{

    public async countryFindAll(): Promise<Country[]> {
        const countries: Country[] = await CountryEntity.find();
        return countries;
    }

    /**
     * Note: Implementation vulnerable to SQL injection. Fix later
     * @param name 
     * @returns 
     */
    public async countryFindAllByName(name: string): Promise<Country[]> {
        const countries: Country[] = await CountryEntity.find();
        return countries.filter((c)=> c.country.toLowerCase().includes(name.toLowerCase()));;
    }

    public async countryFindByName(name: string): Promise<Country> {
        const country: Country = await CountryEntity.findOne({ where: { country: name } });
        if (!country) throw new HttpException(404, 'Country not found'); 

        return country;
    }

    public async countryCreate(country: CreateCountryDto): Promise<Country> {
        // First check if country exists
        let countrySearch = await CountryEntity.findOne({ where: { country: country.country } });

        if (countrySearch) {
            throw new HttpException(400, `Country with name ${country.country} already exists`);
        }

        let dataToSave: CountryEntity = new CountryEntity();
        dataToSave.area = country.area;
        dataToSave.country = country.country;
        dataToSave.total_population = country.total_population;
        dataToSave.year = country.year;

        // Save new data
        const createCountryData: Country = await CountryEntity.save(dataToSave);

        return createCountryData;

    }
    public async countryUpdate(name: string, country: CreateCountryDto): Promise<Country> {
        // First check if country exists
        let countrySearch = await CountryEntity.findOne({ 
            where: { country: name },
            select: ["_id", "area", "country", "total_population", "year"] 
        });

        if (!countrySearch){
            throw new HttpException(404, 'Country not found'); 
        }

         // Then check if country exists with the updated name
        let countryUpdateSearch = await CountryEntity.findOne({ where: { country: country.country } });
        if (countryUpdateSearch && countryUpdateSearch.country !== name) {
            throw new HttpException(400, `Country with name ${country.country} already exists`);
        }

        // Update the country
        countrySearch.area = country.area;
        countrySearch.country = country.country;
        countrySearch.total_population = country.total_population;
        countrySearch.year = country.year;

        // Save update data
        let savedCountry = await CountryEntity.save(countrySearch);

        return savedCountry;
    }

    public async countryDelete(name: string): Promise<Country> {
        // First check if country exists
        let countrySearch = await CountryEntity.findOne({ where: { country: name } });

        if (!countrySearch){
            throw new HttpException(404, 'Country not found'); 
        }

        // Delete country
        await CountryEntity.delete(countrySearch);

        return countrySearch;
    }

}
