import { CacheModule } from '@nestjs/common';
import { env } from './env.config';

export const cacheConfig = CacheModule.register({
  host: env.REDIS.HOST,
  port: env.REDIS.PORT,
});
