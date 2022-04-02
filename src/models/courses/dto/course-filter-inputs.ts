import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { PAGINATION_LIMIT } from 'src/constants';

@InputType()
export class CourseFilterInputs {
  @Field(() => Int, { nullable: true })
  levelId?: number;
  @Field({ nullable: true })
  name?: string;
  @Field(() => Int, { nullable: true })
  gradeId?: number;
  @Field(() => Int, { nullable: true })
  specializationId?: number;
  @Field(() => Int, { nullable: true })
  subjectId?: number;
  @Field(() => Int, { nullable: true, defaultValue: 1 })
  @Min(1)
  page?: number;
  @Field(() => Int, { nullable: true, defaultValue: PAGINATION_LIMIT })
  limit?: number;
}
