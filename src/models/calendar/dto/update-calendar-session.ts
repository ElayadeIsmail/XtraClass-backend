import { Field, InputType, Int } from '@nestjs/graphql';
import { Days } from '@prisma/client';
import { Max, Min } from 'class-validator';

@InputType()
export class UpdateCalendarSession {
  @Field(() => Days)
  day: Days;
  @Field()
  @Min(0)
  @Max(24)
  from: number;
  @Field()
  @Min(0)
  @Max(24)
  to: number;
  @Field(() => Int)
  saleId: number;
}
