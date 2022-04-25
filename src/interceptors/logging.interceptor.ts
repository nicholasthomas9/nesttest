import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Request, Response } from "express";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const startTime = Date.now();
    return next.handle().pipe(
      tap(() =>
        console.log({
          request: {
            method: request.method,
            endpoint: request.path,
          },
          response: {
            statusCode: response.statusCode,
          },
          usage: {
            startTime,
            totalMs: Date.now() - startTime,
          },
        })
      )
    );
  }
}
