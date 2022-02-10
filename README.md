## Setup project
### TypeORM postgresql
```bash
npm install @nestjs/typeorm typeorm pg
```
1. typeorm cli

### User
1. 
```bash
npm install @nestjs/passport passport @types/passport-local passport-local @types/express
```

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
