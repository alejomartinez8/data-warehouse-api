## Description

API REST for [data-warehouse-app](https://github.com/alejomartinez8/data-warehouse-app) based in [NestJS](https://github.com/nestjs/nest).

## Modules
- NestJS
- Typescript
- Prisma (ORM)
- bcrypt
- passport
- cloudinary (media storage)

## Installation

```bash
$ npm install
```

### Installation env vars
Create an .env file in the root and add the next vars, to create an account in cloudinary visit https://cloudinary.com/

```
# SECRET JWT
JWT_SECRET=SECRET_WORD

# POSTGRES
POSTGRES_USER=root
POSTGRES_PASSWORD=password
POSTGRES_DB=data-warehouse-db

# Nest run locally
DB_HOST=localhost
# Nest run in docker, change host to database container name
# DB_HOST=postgres
DB_PORT=5432
DB_SCHEMA=public

# Prisma database connection
DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DB_HOST}:${DB_PORT}/${POSTGRES_DB}?schema=${DB_SCHEMA}&sslmode=prefer

# Cloudinary
CLOUD_NAME=YOUR-CLOUD-NAME
API_KEY=YOUR-API-KEY
API_SECRET=YOUR-API-SECRET

```
Example https://github.com/alejomartinez8/data-warehouse-api/blob/master/.env.example

### Installation Database

#### With Docker

```bash
$ npm run docker:db
```

### Migrations and seed (initial data) to Database

```bash
$ npm run migrate:dev
$ npm run prisma:seed
```

Users created:

- admin@example.com / pwd: 87654321
- user@example.com / pwd: 12345678

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test
```

## Demo

https://data-warehouse-am-api.herokuapp.com/

Users:

- admin@example.com / pwd: 87654321
- user@example.com / pwd: 12345678
