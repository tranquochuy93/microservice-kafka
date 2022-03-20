import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { KafkaOptions, Transport } from '@nestjs/microservices';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from '~app.module';
import { env } from '~config/env.config';
import { ValidateException } from '~core/exceptions/validate.exception';

export class Bootstrap {
  private app: NestExpressApplication;

  async initApp() {
    this.app = await NestFactory.create<NestExpressApplication>(AppModule);
  }

  initPipes() {
    this.app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        stopAtFirstError: true,
        exceptionFactory: (errors) => new ValidateException(errors),
      }),
    );
  }

  initMicroservice() {
    const configService = this.app.get(ConfigService);
    this.app.connectMicroservice<KafkaOptions>({
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'ESG_MAIN',
          brokers: [configService.get<string>('KAFKA_URL', '')],
        },
        consumer: {
          groupId: 'ESG_MAIN',
        },
      },
    });
  }

  async start() {
    this.app.set('trust proxy', true);
    await this.app.startAllMicroservices();
    await this.app.listen(env.APP_PORT);
  }
}
