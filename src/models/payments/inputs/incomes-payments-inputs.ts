import { Field, InputType, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@InputType()
export class IncomesPaymentsInput {
  @Field()
  @Min(0)
  amount: number;
  @Field(() => Int)
  studentId: number;
  @Field(() => Int)
  courseId: number;
  @Field(() => Int)
  year: number;
  @Field(() => Int)
  @Min(1)
  @Max(12)
  month: number;
}
