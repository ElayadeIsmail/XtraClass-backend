import { Field, InputType, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';
import { PaymentType } from '../object-types/Payments';

@InputType()
export class PaymentsFilterInput {
  @Field(() => Int, { defaultValue: new Date().getMonth() })
  @Min(1)
  @Max(12)
  month: number;

  @Field(() => Int, { defaultValue: new Date().getFullYear() })
  year: number;

  @Field(() => PaymentType)
  type: PaymentType;
}
