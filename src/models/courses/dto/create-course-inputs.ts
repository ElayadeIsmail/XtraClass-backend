import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';

@InputType()
export class CreateCourseInput {
  @Field()
  name: string;
  @Min(0)
  @Field(() => Float)
  price: number;
  @Field(() => Int)
  gradeId: number;
  @Field(() => Int)
  levelId: number;
  @Field(() => Int)
  specializationId: number;
  @Field(() => Int)
  subjectId: number;
}
