## Setup project
#### Store config in the environment
- Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology
1. Keeping using ConfigModule

You need to set NODE_ENV in npm scripts so that it can be used to load an env file based on the env.
```bash
"scripts": {
  "start:local": "NODE_ENV=local npm run start"
  "start:dev": "NODE_ENV=dev npm run start"
}
```
Now you can just use the ConfigModule

2.Using dotenv
Import dotenv in main.ts file. Make sure you do it at the top of the file.
```ts
require('dotenv').config({ path: `../${process.env.NODE_ENV}.env` });
```
### TypeORM postgresql
```bash
npm install @nestjs/typeorm typeorm pg
```
1. typeorm cli

### User
1. install
```bash
npm install @nestjs/passport passport @types/passport-local passport-local @types/express
npm install @nestjs/jwt passport-jwt @types/passport-jwt cookie-parser @types/cookie-parser
```
2. 
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

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

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Create New Database Migration

```
npm run typeorm -- migration:create -n 'migration-file-name'
```

Edit the generated migration file and then run:

```
npm run build
npm run typeorm migration:run
```
=================================================
