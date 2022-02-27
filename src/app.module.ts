import { Module } from '@nestjs/common';
import { AuthModule } from '~auth/auth.module';
import { UserModule } from '~users/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from '~config/database.config';
import { ReportMicroserviceModule } from '~microservice/microservice.module';
import { ConfigModule } from '@nestjs/config';
import { i18nConfig } from '~config/i18n.config';

@Module({
  imports: [
    databaseConfig,
    i18nConfig,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ReportMicroserviceModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
