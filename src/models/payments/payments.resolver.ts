import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IncomesPaymentsInput } from './inputs/incomes-payments-inputs';
import { OutGoingPaymentsInput } from './inputs/outgoing-payments-inputs';
import { PaymentsFilterInput } from './inputs/payments-filter-inputs';
import { Payments } from './object-types/Payments';
import { PaymentsService } from './payments.service';

@Resolver()
export class PaymentsResolver {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Mutation(() => Payments)
  async addIncomesPayment(
    @Args('inputs') inputs: IncomesPaymentsInput,
  ): Promise<Payments> {
    return this.paymentsService.AddIncomesPayments(inputs);
  }
  @Mutation(() => Payments)
  async addOutGoingPayment(
    @Args('inputs') inputs: OutGoingPaymentsInput,
  ): Promise<Payments> {
    return this.paymentsService.addOutGoingPayments(inputs);
  }
  @Query(() => [Payments])
  async payments(@Args('args') args: PaymentsFilterInput): Promise<Payments[]> {
    return this.paymentsService.payments(args);
  }
}
