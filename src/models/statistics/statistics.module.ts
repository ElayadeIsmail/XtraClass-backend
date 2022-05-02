import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { StatisticsResolver } from './statistics.resolver';
import { StatisticsService } from './statistics.service';

@Module({
  providers: [StatisticsResolver, StatisticsService, PrismaService],
})
export class StatisticsModule {}
