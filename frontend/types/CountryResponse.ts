
export interface CountryResponseData {
  Country: string;
  Year: string;
  Area: number;
  Total_population: number;
}

export interface CountryResponse{
  "getCountries": CountryResponseData[];
}
