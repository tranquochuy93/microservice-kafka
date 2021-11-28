import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './config/database.config';
import { ReportMicroserviceModule } from './microservice/microservice.module';

@Module({
  imports: [
    ReportMicroserviceModule,
    databaseConfig
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
