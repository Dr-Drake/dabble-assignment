import App from "../app";
import { CountryResolver } from "../resolvers/country.resolver";
import { CountryTypeDef } from "../typedefs/country.type";
import { gql } from "apollo-server-core";
import { Connection } from "typeorm";
import { testConn } from "./db.setup";

// Open and close Db connection
let conn: Connection;
beforeAll(async()=>{
    conn = await testConn(true);
})

afterAll(async ()=>{
    await conn.close();
    await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
})

describe('Country Resolver (e2e)', ()=>{

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
    });
})