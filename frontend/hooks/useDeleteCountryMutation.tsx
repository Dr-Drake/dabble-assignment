import { gql, useMutation } from "@apollo/client";
import { CountryResponse } from "../types/CountryResponse";

export const useDeleteCountryMutation = () =>{
   
    const MUTATION = gql`
        mutation DeleteCountry($name: String!) {
            deleteCountry(name: $name) {
                Country
                Area
                Year
                Total_population
            }
        }
    `;

    const [deleteCountry, { data, loading, error }] = useMutation<CountryResponse>(MUTATION);

    return {
        deleteCountry,
        data: data?.getCountries,
        loading,
        error,
    }
}