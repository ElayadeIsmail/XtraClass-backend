import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Days } from '@prisma/client';

registerEnumType(Days, {
  name: 'days',
});

@ObjectType()
export class CalendarSession {
  @Field(() => Int)
  groupId: number;
  @Field(() => Days)
  day: Days;
  @Field()
  from: string;
  @Field()
  to: string;
}
