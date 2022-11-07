import { EntityRepository } from 'typeorm';
import { ICountryRepository } from '@/interfaces/country.repository.interface';
import { Country } from '@/interfaces/country.interface';
import FakeCountryRepository from './country.abstract.repository';

@EntityRepository()
export default class CountryRepository extends FakeCountryRepository {}
