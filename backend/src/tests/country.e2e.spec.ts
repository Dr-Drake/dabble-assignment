import App from "../app";
import { CountryTypeDef } from "../typedefs/country.type";
import { gql } from "apollo-server-core";
import { Connection } from "typeorm";
import { testConn } from "./db.setup";
import { CreateCountryDto } from "@/dtos/country.dto";
// import { MockCountryResolver } from "@/resolvers/country.mock.resolver";
import { CountryResolver } from "@/resolvers/country.resolver";

// Open and close Db connection
let conn: Connection;
beforeAll(async()=>{
    conn = await testConn(true);
})

afterAll(async ()=>{
    await conn.close();
})

describe('Country Resolver (e2e)', ()=>{

    describe('CREATE OPERATIONS', () => {
        it('response statusCode 200 / createCountry', async () => {
         
            const app = new App([CountryResolver]);
            const apolloServer = app.getApolloServer();

            if (apolloServer) {
                let data: CreateCountryDto = {
                    country: "LuffyLand",
                    year: "1996",
                    area: 12500,
                    total_population: 200
                }

                let data2: CreateCountryDto = {
                    country: "Ireland",
                    year: "1996",
                    area: 124500,
                    total_population: 200000
                }
                const result = await apolloServer.executeOperation({
                    query: gql`
                        mutation (countryData: ${data}) {
                            createCountry {
                                Country
                                Year
                                Area
                                Total_population
                            }
                        }
                    `
                });

                const result2 = await apolloServer.executeOperation({
                    query: gql`
                        mutation (countryData: ${data2}) {
                            createCountry {
                                Country
                                Year
                                Area
                                Total_population
                            }
                        }
                    `
                });

                expect(result).toBeTruthy();
                expect(result).toHaveProperty("data");
                expect(result.errors).toBeFalsy();
                expect(result).toEqual({
                    Country: data.country,
                    Year: data.year,
                    Area: data.area,
                    Total_population: data.total_population
                });

                expect(result2).toBeTruthy();
                expect(result2).toHaveProperty("data");
                expect(result2.errors).toBeFalsy();
                expect(result2).toEqual({
                    Country: data2.country,
                    Year: data2.year,
                    Area: data2.area,
                    Total_population: data2.total_population
                });
            }
        
        });

        it('response statusCode 400 / createCountry', async () => {
         
            const app = new App([CountryResolver]);
            const apolloServer = app.getApolloServer();

            if (apolloServer) {
                let data: CreateCountryDto = {
                    country: "LuffyLand",
                    year: "1996",
                    area: 12500,
                    total_population: 200
                }
                const result = await apolloServer.executeOperation({
                    query: gql`
                        mutation (countryData: ${data}) {
                            createCountry {
                                Country
                                Year
                                Area
                                Total_population
                            }
                        }
                    `
                });

                expect(result).toBeTruthy();
                expect(result).toHaveProperty("errors");
                expect(result.data).toBeFalsy();
                expect(result.errors.some((item: any)=> !!(item.message && item.status))).toBeTruthy();
            }
        
        });
    });

    describe('READ OPERATIONS', () => {
        it('response statusCode 200 / getCountries', async () => {
         
            const app = new App([CountryResolver]);
            const apolloServer = app.getApolloServer();

            if (apolloServer) {
                const result = await apolloServer.executeOperation({
                    query: gql`
                        query {
                            getCountries {
                                Country
                                Year
                                Area
                                Total_population
                            }
                        }
                    `
                });

                expect(result).toBeTruthy();
                expect(result).toHaveProperty("data");
                expect(result.errors).toBeFalsy();
                expect(result).toBeInstanceOf([CountryTypeDef]);
            }
        
        });

        it('response statusCode 200 / getCountriesByName', async () => {
         
            const app = new App([CountryResolver]);
            const apolloServer = app.getApolloServer();

            if (apolloServer) {
                const result = await apolloServer.executeOperation({
                    query: gql`
                        query {
                            getCountriesByName(name: land) {
                                Country
                                Year
                                Area
                                Total_population
                            }
                        }
                    `
                });

                expect(result).toBeTruthy();
                expect(result).toHaveProperty("data");
                expect(result.errors).toBeFalsy();
                expect(result).toBeInstanceOf([CountryTypeDef]);
            }
        
        });

        it('response statusCode 200 / getCountryByName', async () => {
         
            const app = new App([CountryResolver]);
            const apolloServer = app.getApolloServer();

            if (apolloServer) {
                const result = await apolloServer.executeOperation({
                    query: gql`
                        query {
                            getCountryByName(name: Albania) {
                                Country
                                Year
                                Area
                                Total_population
                            }
                        }
                    `
                });

                expect(result).toBeTruthy();
                expect(result).toHaveProperty("data");
                expect(result.errors).toBeFalsy();
                expect(result).toBeInstanceOf(CountryTypeDef);
            }
        
        });

        it('response statusCode 404 / getCountryByName', async () => {
         
            const app = new App([CountryResolver]);
            const apolloServer = app.getApolloServer();

            if (apolloServer) {
                const result = await apolloServer.executeOperation({
                    query: gql`
                        query {
                            getCountryByName(name: I Dont Exist) {
                                Country
                                Year
                                Area
                                Total_population
                            }
                        }
                    `
                });

                expect(result).toBeTruthy();
                expect(result).toHaveProperty("errors");
                expect(result.data).toBeFalsy();
                expect(result.errors.some((item: any)=> !!(item.message && item.status))).toBeTruthy();
            }
        
        });
    });

    describe('UPDATE OPERATION', () => {
        it('response statusCode 200 / updateCountry', async () => {
         
            const app = new App([CountryResolver]);
            const apolloServer = app.getApolloServer();

            if (apolloServer) {
                let data: CreateCountryDto = {
                    country: "LuffyIsland",
                    year: "1996",
                    area: 14000,
                    total_population: 530
                }
                const result = await apolloServer.executeOperation({
                    query: gql`
                        mutation (name: LuffyLand, countryData: ${data}) {
                            createCountry {
                                Country
                                Year
                                Area
                                Total_population
                            }
                        }
                    `
                });

                expect(result).toBeTruthy();
                expect(result).toHaveProperty("data");
                expect(result.errors).toBeFalsy();
                expect(result).toEqual({
                    Country: data.country,
                    Year: data.year,
                    Area: data.area,
                    Total_population: data.total_population
                });
            }
        
        });

        it('response statusCode 400 / updateCountry. Changing name to a country that already exists', async () => {
         
            const app = new App([CountryResolver]);
            const apolloServer = app.getApolloServer();

            if (apolloServer) {
                let data: CreateCountryDto = {
                    country: "Ireland",
                    year: "1996",
                    area: 14000,
                    total_population: 530
                }
                const result = await apolloServer.executeOperation({
                    query: gql`
                        mutation (name: LuffyIsland, countryData: ${data}) {
                            createCountry {
                                Country
                                Year
                                Area
                                Total_population
                            }
                        }
                    `
                });

                expect(result).toBeTruthy();
                expect(result).toHaveProperty("data");
                expect(result.errors).toBeFalsy();
                expect(result).toEqual({
                    Country: data.country,
                    Year: data.year,
                    Area: data.area,
                    Total_population: data.total_population
                });
            }
        
        });
    });

    describe('DELETE OPERATION', () => {
        it('response statusCode 200 / deleteCountry', async () => {
         
            const app = new App([CountryResolver]);
            const apolloServer = app.getApolloServer();

            if (apolloServer) {
                const result = await apolloServer.executeOperation({
                    query: gql`
                        mutation (name: LuffyIsland) {
                            deleteCountry {
                                Country
                                Year
                                Area
                                Total_population
                            }
                        }
                    `
                });

                expect(result).toBeTruthy();
                expect(result).toHaveProperty("data");
                expect(result.errors).toBeFalsy();
                expect(result).toBeInstanceOf(CountryTypeDef);
            }
        
        });

        it('response statusCode 404 / deleteCountry', async () => {
         
            const app = new App([CountryResolver]);
            const apolloServer = app.getApolloServer();

            if (apolloServer) {
                const result = await apolloServer.executeOperation({
                    query: gql`
                        mutation (name: Non Existent) {
                            deleteCountry {
                                Country
                                Year
                                Area
                                Total_population
                            }
                        }
                    `
                });

                expect(result).toBeTruthy();
                expect(result).toHaveProperty("errors");
                expect(result.data).toBeFalsy();
                expect(result.errors.some((item: any)=> !!(item.message && item.status))).toBeTruthy();
            }
        
        });
    });
})