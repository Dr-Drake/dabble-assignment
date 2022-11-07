import App from '@/app';
import validateEnv from '@utils/validateEnv';
import { CountryResolver } from './resolvers/country.resolver';


validateEnv();

const app = new App([CountryResolver]);

app.listen();
