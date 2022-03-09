import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';
import { ValidateException } from '../exceptions/validate.exception';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  protected responseError(
    host: ArgumentsHost,
    code: number,
    message: string,
    errors: string | Record<string, unknown> | null = null,
  ) {
    const ctx = host.switchToHttp();
    ctx.getResponse().status(code).json({
      message: message,
      errors: errors,
    });
  }

  async catch(exception: Error, host: ArgumentsHost) {
    if (exception instanceof EntityNotFoundError) {
      return this.catchEntityNotFound(exception, host);
    }

    if (exception instanceof HttpException) {
      return this.catchHttpException(exception, host);
    }

    if (exception instanceof ValidateException) {
      return this.responseError(
        host,
        exception.statusCode,
        exception.message,
        exception.response,
      );
    }

    if (exception.name === 'JsonWebTokenError') {
      return this.responseError(
        host,
        HttpStatus.UNAUTHORIZED,
        exception.message,
      );
    }

    return this.catchAnotherException(exception, host);
  }

  catchAnotherException(exception: TypeError, host: ArgumentsHost) {
    return this.responseError(
      host,
      HttpStatus.INTERNAL_SERVER_ERROR,
      'An error occurred during processing.',
    );
  }

  catchHttpException(exception: HttpException, host: ArgumentsHost) {
    return this.responseError(
      host,
      exception.getStatus(),
      exception.message,
      exception.getResponse(),
    );
  }

  catchEntityNotFound(exception: EntityNotFoundError, host: ArgumentsHost) {
    const messageRegex = /"[a-zA-Z]+"/.exec(exception.message);
    let message = exception.message;
    if (messageRegex) {
      message = messageRegex[0].replace('"', '').replace('"', '');
    }

    return this.responseError(host, HttpStatus.NOT_FOUND, message);
  }
}
