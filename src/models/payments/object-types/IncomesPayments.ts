import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class IncomesPayments {
  @Field(() => Int)
  id: number;
}
