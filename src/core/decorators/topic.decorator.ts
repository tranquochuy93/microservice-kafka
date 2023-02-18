import { applyDecorators } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

export type TopicOptions = {
    pattern: string;
};

export function Topic(options: TopicOptions): any {
    const pattern = `${process.env.KAFKA_PREFIX || ''}${options.pattern}`;

    return applyDecorators(MessagePattern(pattern));
}
