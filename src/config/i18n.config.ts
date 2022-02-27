import { HeaderResolver, I18nJsonParser, I18nModule } from 'nestjs-i18n';
import path from 'path';
import { env } from './env.config';

export const i18nConfig = I18nModule.forRoot({
  fallbackLanguage: 'en',
  parser: I18nJsonParser,
  parserOptions: {
    path: path.join(env.ROOT_PATH, 'i18n/'),
    watch: true,
  },
  resolvers: [new HeaderResolver(['language'])],
});
