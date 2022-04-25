import { Injectable, Scope } from "@nestjs/common";


@Injectable()
export class MetricsService {
    private metricsData: Record<string, any> = {};
    
    setMetricsData(value: unknown, path?: string) {
        if (path) {
            console.log(path);
            
            // set(this.matricsData, path, value);
        }else if (typeof value === 'object') {
            this.metricsData = {...this.metricsData, ...value};
        }
    }


    async sendMetricsToSqs(){
        //not important currently
        const message = JSON.stringify(this.metricsData);
    }
}