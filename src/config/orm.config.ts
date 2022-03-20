import { ConnectionOptions } from 'typeorm';
import { env } from './env.config';

const config: ConnectionOptions = {
  type: env.DATABASE.CONNECT,
  host: env.DATABASE.HOST,
  port: env.DATABASE.PORT,
  username: env.DATABASE.USER,
  password: env.DATABASE.PASSWORD,
  database: env.DATABASE.NAME,
  // configure running migration
  // migrations: [`${env.ROOT_PATH}/migrations/*.ts`],
  migrations: ['dist/migrations/*.js'],
  // entities: [`${env.ROOT_PATH}/**/*.entity.${isTest ? 'ts' : 'js'}`],
  // entities: [__dirname + '/dist/**/*.entity.js'],
  // entities: [__dirname + '/**/entities/*.entity.{js,ts}'],
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrationsRun: true,
  cli: {
    // configure creation migration
    entitiesDir: 'src/**/entities/*.entity{.ts,.js}',
    migrationsDir: 'src/migrations',
  },
} as any;

export default config;
