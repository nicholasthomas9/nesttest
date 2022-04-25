import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Response } from "express";
import { catchError, map, Observable, tap } from "rxjs";
import { MetricsService } from "./metrics.service";

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  constructor(private readonly metrics: MetricsService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Promise<Observable<any>> {
    const startTime = new Date();
    const request = context.switchToHttp().getRequest<Request | any>();

    return next.handle().pipe(
      map(async (data) => {
        console.log(data);

        const response = context.switchToHttp().getResponse();
        const requestMetricsData = await this.buildMetricsData(
          request,
          response,
          startTime.getTime()
        );
        console.log(requestMetricsData);

        this.metrics.setMetricsData(requestMetricsData);
        await this.metrics.sendMetricsToSqs();
      }),
      catchError(async (err) => {
        const requestMetricsData = this.buildMetricsData(
          request,
          err.response,
          startTime.getTime()
        );
        console.log(JSON.stringify(requestMetricsData));

        this.metrics.setMetricsData(requestMetricsData);
        await this.metrics.sendMetricsToSqs();
        return err.response;
      })
    );
  }

  async buildMetricsData(
    request: Request,
    response: Response,
    startTime: number
  ): Promise<any> {
    return new Promise((resolve) => {
      resolve({
        endpoint: {
          request: {
            method: request.method,
            endpoint: request.url,
          },
          response: {
            statusCode: response.statusCode,
          },
          usage: {
            startTime,
            totalMs: Date.now() - startTime,
          },
        },
      });
    });
    return;
  }
}
