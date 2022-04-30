import { Field, InputType, Int } from '@nestjs/graphql';
import { Days } from '@prisma/client';

@InputType()
export class CreateCalendarSession {
  @Field(() => Int)
  groupId: number;
  @Field(() => Days)
  day: Days;
  @Field()
  from: string;
  @Field()
  to: string;
  @Field(() => Int)
  saleId: number;
}
