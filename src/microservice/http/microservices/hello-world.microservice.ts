import { MessagePattern } from '@nestjs/microservices';
import { Microservice } from 'src/core/decorators/microservice.decorator';
import { MessagePatternEnum } from 'src/microservice/enum/message-pattern.enum';
import { HelloWorldModel } from '~microservice/models/hello-world.model';
import { HelloWorldService } from '~microservice/services/hello-world.service';

@Microservice()
export class HelloWorldMicroservice {
    constructor(private helloWorldService: HelloWorldService) {}

    @MessagePattern(MessagePatternEnum.HELLO_WORLD)
    helloWorld(): Promise<HelloWorldModel> {
        return this.helloWorldService.helloWorld();
    }
}
