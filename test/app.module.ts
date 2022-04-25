import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { CatsModule } from "./cats/cats.module";
import { MetricsService } from "./metrics/metrics.service";
import { MetricsInterceptor } from "./metrics/metrics.interceptor";
// import { CoreModule } from './core/core.module';

@Module({
  imports: [CatsModule],
  providers: [
    MetricsService,
    {
      provide: APP_INTERCEPTOR,
      useClass: MetricsInterceptor,
    },
  ],
})
export class AppModule {}
