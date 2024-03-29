import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AuthModule } from '~auth/auth.module';
import { GlobalCacheModule } from '~config/cache.config';
import { databaseConfig } from '~config/database.config';
import { i18nConfig } from '~config/i18n.config';
import { HttpExceptionFilter } from '~core/filters/http-exception.filter';
import { MicroserviceModule } from '~microservice/microservice.module';
import { UserModule } from '~users/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [
        databaseConfig,
        i18nConfig,
        GlobalCacheModule,
        ConfigModule.forRoot({
            isGlobal: true
        }),
        AuthModule,
        UserModule,
        MicroserviceModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter
        }
    ]
})
export class AppModule {}
