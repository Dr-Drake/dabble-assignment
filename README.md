## Description
A repository contains the code for a fairly simple assessment assigned to me by a potential employer.
It show cases my attempt to build a graphql server that allows CRUD operations on a dataset of countries.
The project was written in [Typescript](http://typescript.com/).
Other technologies here include:
 - [Apollo Graphql](https://www.apollographql.com/)
 - [TypeGraphQL](https://typegraphql.com/)
- [MongoDB](https://www.mongodb.com/),
- [Typeorm](https://typeorm.io/),
- [Express JS](https://expressjs.com/)
- [Next JS](https://nextjs.org/)

## Demo GraphQL Endpoit
:point_right: https://dabble-backend.onrender.com/graphql

## Demo Frontend
:point_right: https://dabble-assignment.vercel.app/

## Installation

```bash
# Install Dependencies for backend
$ cd backend
$ npm install or yarn install

# Install Dependencies for frontend
$ cd frontend
$ npm install or yarn install
```

## Running the backend

```bash
$ cd backend

# development & watch mode
$ npm run dev

# production mode
$ npm run start:prod:local
```

## Running the Frontend

```bash
$ cd frontend

# development & watch mode
$ npm run dev

# production mode
$ npm run build
$ npm run start
```

## Test
Only written test for backend.
```bash
$ npm run test
```
## Gotchas

#### Environment variables
Create a the following .env files:
- .env.development.local 
- .env.production.local
- .env.test.local

Make sure each have the following environment variables: PORT, DB_HOST, DB_PORT DB_USER, DB_PASSWORD, DB_DATABASE, DB_AUTH_SRC, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN, and CREDENTIALS

## Stay in touch

- Author - [Ikem Ezechukwu](ikem.ezechukwu@outlook.com)
- LinkedIn - [https://www.linkedin.com/in/ikem-ezechukwu-547261109/](https://www.linkedin.com/in/ikem-ezechukwu-547261109/)


## License

Nest is [MIT licensed](LICENSE).
