import { Field, InputType, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@InputType()
export class OutGoingPaymentsInput {
  @Field()
  @Min(0)
  amount: number;
  @Field(() => Int, { nullable: true })
  instructorId?: number;
  @Field(() => Int, { nullable: true })
  staffId?: number;
  @Field(() => Int)
  year: number;
  @Field(() => Int)
  @Min(1)
  @Max(12)
  month: number;
}
