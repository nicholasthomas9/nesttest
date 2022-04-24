import { MetricsService } from "./metrics/metrics.service";


@Module({
    providers: [
        MetricsService,
    ],
    export: [
        MetricsService,
    ],
    imports: [ConfigModule.forRoot({
        isGlobal: true, cache: true
    })],

})
export default class CommonModule {}