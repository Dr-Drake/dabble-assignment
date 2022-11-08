import 'module-alias/register';
import { addAliases } from 'module-alias';

addAliases({
    '@config': `${__dirname}/config`,
    '@databases': `${__dirname}/databases`,
    '@dtos': `${__dirname}/dtos`,
    "@/app": `${__dirname}/app`,
    '@middlewares': `${__dirname}/middlewares`,
    '@entities': `${__dirname}/entities`,
    '@exceptions': `${__dirname}/exceptions`,
    '@interfaces': `${__dirname}/interfaces`,
    '@utils': `${__dirname}/utils`,
    '@repositories': `${__dirname}/repositories`,
    '@resolvers': `${__dirname}/resolvers`,
    '@typedefs': `${__dirname}/typedefs`,
});