## Description

API REST for [data-warehouse-app](https://github.com/alejomartinez8/data-warehouse-app) based in [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

### Installation Database

#### With Docker

```bash
$ npm run docker:db
```

### Installation env vars

```
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"

JWT_SECRET=secrete
```

### Migrations and seed (initial data) to Database

```bash
$ npm run start:dev
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
