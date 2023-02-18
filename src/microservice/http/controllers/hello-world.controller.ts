import { Controller, Get } from '@nestjs/common';
import { HelloWorldService } from '~microservice/services/hello-world.service';

@Controller('hello-worlds')
export class HelloWorldController {
    constructor(private helloworldService: HelloWorldService) {}

    @Get()
    helloWorld() {
        return this.helloworldService.helloWorld();
    }
}
