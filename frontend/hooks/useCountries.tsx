import { useQuery, gql } from "@apollo/client";
import { CountryResponse } from "../types/CountryResponse";

export const useCountries = () =>{
   
    const QUERY = gql`
        query {
            getCountries {
                Country
                Area
                Year
                Total_population
            }
        }
    `;

    const { data, loading, error, refetch } = useQuery<CountryResponse>(QUERY);

    return {
        data: data?.getCountries,
        isLoading: loading,
        error: error,
        refetch: refetch
    }
}