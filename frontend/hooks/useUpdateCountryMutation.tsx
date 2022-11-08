import { gql, useMutation } from "@apollo/client";
import { CountryResponse } from "../types/CountryResponse";

export const useUpdateCountryMutation = () =>{
   
    const MUTATION = gql`
        mutation UpdateCountry($updateCountryData: CreateCountryDto!, $name: String!) {
            updateCountry(countryData: $updateCountryData, name: $name) {
                Area
                Country
                Total_population
                Year
            }
        }
    `;

    const [updateCountry, { data, loading, error }] = useMutation<CountryResponse>(MUTATION);

    return {
        updateCountry,
        data: data?.getCountries,
        loading,
        error,
    }
}