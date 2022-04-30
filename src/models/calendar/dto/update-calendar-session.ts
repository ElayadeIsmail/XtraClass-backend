import { Field, InputType, Int } from '@nestjs/graphql';
import { Days } from '@prisma/client';

// registerEnumType(Days, {
//   name: 'days',
// });

@InputType()
export class UpdateCalendarSession {
  @Field(() => Days)
  day: Days;
  @Field()
  from: string;
  @Field()
  to: string;
  @Field(() => Int)
  saleId: number;
}
