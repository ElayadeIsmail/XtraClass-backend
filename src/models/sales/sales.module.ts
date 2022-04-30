import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesResolver } from './sales.resolver';

@Module({
  providers: [SalesResolver, SalesService]
})
export class SalesModule {}
