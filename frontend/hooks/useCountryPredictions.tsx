import { gql, useQuery } from "@apollo/client";
import React from "react";
import toast from "react-hot-toast";
import client from "../apollo-client";
import { CountryByNameResponse, CountryResponse, CountryResponseData } from "../types/CountryResponse";
import { parseErrorMessage } from "../utils/errorUtils";
import { useDebounce } from "./useDebounce";

export default function useCountryPredictions(name: string, shouldFetch: boolean = false): [CountryResponseData[], boolean] {
    const [predictions, setPredictions] = React.useState<CountryResponseData[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);

    // Effect
    React.useEffect(()=>{
        if (!shouldFetch){
            setPredictions([]);
        }
    }, [shouldFetch]);

    const QUERY = gql`
        query GetCountriesByName($name: String!) {
            getCountriesByName(name: $name) {
                Country
                Area
                Year
                Total_population
            }
        }
    `;


    const handleSearchChange = async () => {
        if (name.trim() === '') {
            setPredictions([]);
            return;
        };
        if (!shouldFetch){
            setPredictions([]);
            return;
        };

        setLoading(true);
        const { data, error } = await client.query<CountryByNameResponse>({ 
            query: QUERY,
            variables: { name } 
        });

        if (data) {
            setLoading(false);
            setPredictions(data.getCountriesByName);
        }

        if (error) {
            console.log(error);
            toast.error(parseErrorMessage(error));
            setPredictions([]);
        }
    }

    useDebounce(handleSearchChange, 500, [name]);

    return [predictions, loading];
}