import 'reflect-metadata';
import { ApolloServerPluginLandingPageProductionDefault, ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import { buildSchema, NonEmptyArray } from 'type-graphql';
import { Connection, createConnection } from 'typeorm';
import { NODE_ENV, PORT, ORIGIN, CREDENTIALS } from '@config';
import { dbConnection, dbConnectionProd } from '@databases';
//import { authMiddleware, authChecker } from '@middlewares/auth.middleware';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, responseLogger, errorLogger } from '@utils/logger';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;
  public apolloServer: ApolloServer;

  constructor(resolvers: NonEmptyArray<Function> | NonEmptyArray<string>, openDbConnection?: boolean) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    openDbConnection && this.connectToDatabase();
    this.initializeMiddlewares();
    this.initApolloServer(resolvers);
    this.initializeErrorHandling();
  }

  public async listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`🎮 http://localhost:${this.port}/graphql`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  public getApolloServer(){
    return this.apolloServer;
  }

  private connectToDatabase() {
    let cb = (value: Connection)=> logger.info("Database connected");
    process.env.NODE_ENV === 'production' ?
    createConnection(dbConnectionProd).then(cb) :
    createConnection(dbConnection).then(cb);
  }

  private initializeMiddlewares() {
    if (this.env === 'production') {
      this.app.use(hpp());
      this.app.use(helmet());
    }

    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private async initApolloServer(resolvers: NonEmptyArray<Function> | NonEmptyArray<string>) {
    const schema = await buildSchema({
      resolvers: resolvers,
      //authChecker: authChecker,
    });

    this.apolloServer = new ApolloServer({
      schema: schema,
      introspection: true, // For the sake of demonstration
      plugins: [
        this.env === 'production'
          ? ApolloServerPluginLandingPageProductionDefault({ footer: false })
          : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
      ],
      // context: async ({ req }) => {
      //   try {
      //     const user = await authMiddleware(req);
      //     return { user };
      //   } catch (error) {
      //     throw new Error(error);
      //   }
      // },
      formatResponse: (response, request) => {
        responseLogger(request);

        return response;
      },
      formatError: error => {
        errorLogger(error);

        if (error.extensions.exception && error.extensions.exception.status){
          return {
            message: error.message,
            status: error.extensions.exception.status
          }
        }

        else

        return error;
      },
    });

    await this.apolloServer.start();
    this.apolloServer.applyMiddleware({ app: this.app, cors: ORIGIN, path: '/graphql' });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
