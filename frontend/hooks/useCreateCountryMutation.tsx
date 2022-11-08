import { gql, useMutation } from "@apollo/client";
import { CountryResponse } from "../types/CountryResponse";

export const useCreateCountryMutation = () =>{
   
    const MUTATION = gql`
        mutation CreateCountry($countryData: CreateCountryDto!) {
            createCountry(countryData: $countryData) {
                Country
                Area
                Year
                Total_population
            }
        }
    `;

    const [createCountry, { data, loading, error }] = useMutation<CountryResponse>(MUTATION);

    return {
        createCountry,
        data: data?.getCountries,
        loading,
        error,
    }
}