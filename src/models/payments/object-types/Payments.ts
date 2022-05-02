import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IncomesPayments } from './IncomesPayments';
import { OutgoingPayments } from './OutgoingPayments';

@ObjectType()
export class Payments {
  @Field(() => Int)
  id: number;
  @Field(() => Int, { nullable: true })
  incomesPaymentId?: number;
  @Field(() => IncomesPayments, { nullable: true })
  incomesPayment?: IncomesPayments;
  @Field(() => Int, { nullable: true })
  outgoingPaymentId?: number;
  @Field(() => OutgoingPayments, { nullable: true })
  outgoingPayment?: OutgoingPayments;
}
