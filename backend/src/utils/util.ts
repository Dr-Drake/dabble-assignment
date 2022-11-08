import { Country } from "@/interfaces/country.interface";
import { CountryTypeDef } from "@/typedefs/country.type";

/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
 export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

export const mapCountryToTypeDef = (country: Country): CountryTypeDef => {
  let result: CountryTypeDef = {
    Country: country.country,
    Year: country.year,
    Area: country.area,
    Total_population: country.total_population
  }

  return result;
}
