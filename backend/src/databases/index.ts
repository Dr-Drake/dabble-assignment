import { join } from 'path';
import { ConnectionOptions } from 'typeorm';
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE, DB_AUTH_SRC } from '@config';

export const dbConnection: ConnectionOptions = {
  type: 'mongodb',
  host: DB_HOST,
  port: Number.parseInt(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  authSource: DB_AUTH_SRC,
  synchronize: true,
  logging: false,
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
};

export const dbConnectionProd: ConnectionOptions = {
  type: 'mongodb',
  url: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.iebwm.mongodb.net/?retryWrites=true&w=majority`,
  //database: DB_DATABASE,
  synchronize: true,
  logging: false,
  ssl: true,
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
};
