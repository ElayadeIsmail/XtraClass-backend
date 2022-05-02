import { Field, InputType, Int } from '@nestjs/graphql';
import { Days } from '@prisma/client';
import { IsEnum, Max, Min } from 'class-validator';

@InputType()
export class CreateCalendarSession {
  @Field(() => Int)
  groupId: number;
  @Field(() => Days)
  @IsEnum(Days)
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
