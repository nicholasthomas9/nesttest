import { Module } from '@nestjs/common';
import { MetricsModule } from '../metrics/metrics.module';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  imports: [MetricsModule],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}