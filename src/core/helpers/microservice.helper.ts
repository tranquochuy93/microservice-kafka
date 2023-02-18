import { HttpException } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Cache } from 'cache-manager';
import { plainToClass } from 'class-transformer';
import md5 from 'md5';
import { firstValueFrom, Observable, timeout } from 'rxjs';
import { env } from '~config/env.config';
import { DEFAULT_MICROSERVICE_CACHING_TTL } from '~core/constants/caching.constant';
import { MICROSERVICE_TIMEOUT } from '~core/constants/microservice-timeout.constant';
import { CacheOptions } from '~core/types/cache-option.type';

export class MicroserviceHelper<Model> {
    private topicName: string;
    private readonly payload: any;
    private cacheManager: Cache;
    private cacheOptions?: CacheOptions;

    static with<Model>(client: ClientKafka, model?: { new (): Model }) {
        return new MicroserviceHelper<Model>(client, model);
    }

    private constructor(private client: ClientKafka, private model: { new (): Model }) {
        this.payload = {
            value: {},
            headers: {}
        };
    }

    topic(name: string) {
        this.topicName = `${env.KAFKA.TOPIC_PREFIX}${name}`;
        return this;
    }

    data(data) {
        this.payload.value = data;
        return this;
    }

    async getOne(): Promise<Model> {
        let data = await this.getMany();
        return data[0];
    }

    async getMany(): Promise<Model[]> {
        try {
            let data = await this.execute();
            console.log('Get data success: ', this.topicName);
            if (Array.isArray(data)) {
                return plainToClass(this.model, data);
            } else {
                return [plainToClass(this.model, data)];
            }
        } catch (exception) {
            console.log(this.topicName, exception);
            throw exception;
        }
    }

    async execute<T>(): Promise<T> {
        const handler = () =>
            this.toPromise<T>(this.client.send(this.topicName, this.payload).pipe(timeout(MICROSERVICE_TIMEOUT)));

        if (this.cacheManager) {
            const { ttl = DEFAULT_MICROSERVICE_CACHING_TTL, prefix } = this.cacheOptions || {};
            const key = prefix + md5(this.topicName + JSON.stringify(this.payload));
            const cachedData = await this.cacheManager.get<T>(key);

            if (!cachedData) {
                const data = await handler();
                await this.cacheManager.set(key, data, { ttl });
                return data;
            }

            return cachedData;
        }

        return handler();
    }

    emit(): Promise<void> {
        return this.toPromise(this.client.emit(this.topicName, this.payload));
    }

    async toPromise<T>(observe: Observable<T>) {
        try {
            return await firstValueFrom(observe);
        } catch (error) {
            if (error.code) {
                let httpError = new HttpException(error.description, error.code);
                httpError['response' as any] = error.errors;
                httpError.message = error.message;
                throw httpError;
            } else {
                throw error;
            }
        }
    }
}
