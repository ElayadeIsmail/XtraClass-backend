import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsResolver } from './payments.resolver';

@Module({
  providers: [PaymentsResolver, PaymentsService]
})
export class PaymentsModule {}
