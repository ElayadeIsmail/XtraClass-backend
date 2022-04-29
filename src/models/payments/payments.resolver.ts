import { Resolver } from '@nestjs/graphql';
import { PaymentsService } from './payments.service';

@Resolver()
export class PaymentsResolver {
  constructor(private readonly paymentsService: PaymentsService) {}
}
