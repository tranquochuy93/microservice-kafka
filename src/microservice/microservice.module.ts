import { Global, Module } from '@nestjs/common';
import { ReportMicroservice } from './http/microservices/report.microservice';

@Global()
@Module({
  providers: [],
  exports: [],
  controllers: [ReportMicroservice],
  imports: [],
})
export class ReportMicroserviceModule {}