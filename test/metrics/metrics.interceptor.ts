

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
    constructor(
        private readonly metrics: MetricsService,
    ) {}

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const startTime = Dat.now();
        const request = context.switchToHttp().getRequest<Request | any>();

        return next.handle().pipe(
            tap(async (promise) => {
                const response = await promise;
                const requestMetricsData = this.buildMetricsData(user, request, response, startTime);
                this.metrics.setData(requestMetricsData);
                this.metrics.sendDataToSqs();
            }),
        );
        return next.handle();
    }

    async buildMetricsData(
        request: Request,
        response: Response,
        startTime: number,
    ): Promise<any> {
        return {
            request: {
                method: request.method,
                endpoint: request.path,
                requestIp: request.referrerPolicy,
            },

            response: {
                statusCode: response.statusCode,
            },

            usage: {
                startTime,
                totalMs: Date.now() - startTime,
            },
        };
    }
}

