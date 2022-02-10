import { ConnectionOptions } from 'typeorm';
import { env } from './env.config'

let isTest = process.env.NODE_ENV === 'test';
const config: ConnectionOptions = {
    type: env.DATABASE.CONNECT,
    host: env.DATABASE.HOST,
    port: env.DATABASE.PORT,
    username: env.DATABASE.USER,
    password: env.DATABASE.PASSWORD,
    database: env.DATABASE.NAME,
    // configure running migration
    migrations: [`${env.ROOT_PATH}/migrations/*.${isTest ? 'ts' : 'js'}`],
    migrationsRun: true,
    cli: {
        // configure creation migration
        migrationsDir: `${env.ROOT_PATH}/migrations`
    }
} as any;

export = config;