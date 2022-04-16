import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { PAGINATION_LIMIT } from 'src/common/constants';

@InputType()
export class InstructorFilterInputs {
  @Field({ nullable: true, defaultValue: '' })
  name: string;
  @Field(() => Int, { nullable: true, defaultValue: 1 })
  @Min(1)
  page: number;
  @Field(() => Int, { nullable: true, defaultValue: PAGINATION_LIMIT })
  limit: number;
}
