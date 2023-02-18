import { Inject, Module, OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import { randomUUID } from 'crypto';
import { env } from '~config/env.config';
import { CLIENT } from './constants/client.constant';
import { TopicEnum } from './enum/topic.enum';
import { HelloWorldController } from './http/controllers/hello-world.controller';
import { HelloWorldService } from './services/hello-world.service';

@Module({
    providers: [HelloWorldService],
    exports: [HelloWorldService],
    controllers: [HelloWorldController],
    imports: [
        ClientsModule.register([
            {
                name: CLIENT,
                transport: Transport.KAFKA,
                options: {
                    client: {
                        clientId: `${env.KAFKA.TOPIC_PREFIX}_${CLIENT}_${randomUUID({
                            disableEntropyCache: true
                        })}`,
                        brokers: [env.KAFKA.URL]
                    },
                    consumer: {
                        groupId: `${env.KAFKA.TOPIC_PREFIX}_${CLIENT}_${randomUUID({ disableEntropyCache: true })}`,
                        allowAutoTopicCreation: true,
                        maxWaitTimeInMs: 1000
                    }
                }
            }
        ])
    ]
})
export class MicroserviceModule implements OnModuleInit, OnApplicationBootstrap {
    constructor(@Inject(CLIENT) private client: ClientKafka) {}

    async onModuleInit() {
        const topics = [...Object.values(TopicEnum)];
        for (const topic of topics) {
            this.client.subscribeToResponseOf(`${env.KAFKA.TOPIC_PREFIX}${topic}`);
        }
        await this.client.connect();
    }

    async onApplicationBootstrap() {
        return;
    }
}
