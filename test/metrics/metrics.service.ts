

@Injectable({
    scope: Scope.REQUEST,
})
export class MetricsService {
    private metricsData: Record<string, any> = {};
    
    setMetricsData(value: unknown, path?: string) {
        if (path) {
            set(this.matricsData, path, value);
        }else if (typeof value === 'object') {
            this.metricsData = {...this.metricsData, ...value};
        }
    }


    async sendMetricsToSqs(){
        //not important currently
        const message = JSON.stringify(this.metricsData);
    }
}