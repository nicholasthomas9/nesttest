import { Module } from '@nestjs/common';
import { MetricsService } from 'test/metrics/metrics.service';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService, MetricsService],
})
export class CatsModule {}