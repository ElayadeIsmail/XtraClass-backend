import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { SalesResolver } from './sales.resolver';
import { SalesService } from './sales.service';

@Module({
  providers: [SalesResolver, SalesService, PrismaService],
})
export class SalesModule {}
