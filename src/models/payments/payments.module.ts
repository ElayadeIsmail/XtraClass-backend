import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { PaymentsResolver } from './payments.resolver';
import { PaymentsService } from './payments.service';

@Module({
  providers: [PaymentsResolver, PaymentsService, PrismaService],
})
export class PaymentsModule {}
