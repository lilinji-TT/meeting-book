import { Module } from '@nestjs/common';
import { StatisticController } from './statistic.controller';
import { StatisticService } from './statistic.service';

@Module({
  providers: [StatisticService],
  controllers: [StatisticController],
})
export class StatisticModule {}
