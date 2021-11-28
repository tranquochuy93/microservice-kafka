import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config'
import { KafkaOptions, Transport } from '@nestjs/microservices'
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  const configService = app.get(ConfigService)
  await app.connectMicroservice<KafkaOptions>({
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
  })

  await app.startAllMicroservices()
}
bootstrap();
