import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { MicroserviceHelper } from '~core/helpers/microservice.helper';
import { CLIENT } from '~microservice/constants/client.constant';
import { TopicEnum } from '~microservice/enum/topic.enum';
import { HelloWorldModel } from '~microservice/models/hello-world.model';

@Injectable()
export class HelloWorldService {
    constructor(@Inject(CLIENT) private client: ClientKafka) {}
    helloWorld(): Promise<HelloWorldModel> {
        return MicroserviceHelper.with(this.client, HelloWorldModel).topic(TopicEnum.HELLO_WORLD).getOne();
    }
}
