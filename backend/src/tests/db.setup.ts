import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_AUTH_SRC } from '../config';
import { join } from "path";
import { createConnection } from "typeorm"

export const testConn = (drop: boolean = false) =>{
    return createConnection({
        type: 'mongodb',
        host: DB_HOST,
        port: Number.parseInt(DB_PORT || '27017'),
        username: DB_USER,
        password: DB_PASSWORD,
        database: 'dabble-test',
        authSource: DB_AUTH_SRC,
        synchronize: drop,
        dropSchema: drop,
        logging: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
        migrations: [join(__dirname, '../**/*.migration{.ts,.js}')],
        subscribers: [join(__dirname, '../**/*.subscriber{.ts,.js}')],
        cli: {
            entitiesDir: 'src/entities',
            migrationsDir: 'src/migration',
            subscribersDir: 'src/subscriber',
        },
    });
}

testConn(true);