import { TypeOrmModule } from '@nestjs/typeorm';
import config from './orm.config';

console.log(config);

export const databaseConfig = TypeOrmModule.forRoot(config);
