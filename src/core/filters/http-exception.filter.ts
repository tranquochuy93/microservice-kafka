import { Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { Observable, throwError } from 'rxjs'
import { EntityNotFoundError } from 'typeorm'
import { ValidateException } from '../exceptions/validate.exception'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  protected responseError(code: number, message: string, errors: string | object | null = null): Observable<never> {
    return throwError(
      JSON.stringify({
        message: message,
        errors: errors,
        code: code,
      }),
    )
  }

  async catch(exception: Error): Promise<Observable<never>> {
    if (exception instanceof EntityNotFoundError) {
      return this.catchEntityNotFound(exception)
    } else if (exception instanceof HttpException) {
      return this.catchHttpException(exception)
    } else if (exception instanceof ValidateException) {
      return this.responseError(exception.statusCode, exception.message, exception.response)
    } else if (exception.name === 'JsonWebTokenError') {
      return this.responseError(HttpStatus.UNAUTHORIZED, exception.message)
    } else {
      return this.catchAnotherException(exception)
    }
  }

  catchAnotherException(exception: TypeError): Observable<never> {
    console.log(exception)
    return this.responseError(HttpStatus.INTERNAL_SERVER_ERROR, 'An error occurred during processing.')
  }

  catchHttpException(exception: HttpException): Observable<never> {
    return this.responseError(exception.getStatus(), exception.message, exception.getResponse())
  }

  catchEntityNotFound(exception: EntityNotFoundError): Observable<never> {
    const messageRegex = /"[a-zA-Z]+"/.exec(exception.message)
    let message = exception.message
    if (messageRegex) {
      message = messageRegex[0].replace('"', '').replace('"', '')
    }
    return this.responseError(HttpStatus.NOT_FOUND, message)
  }
}
