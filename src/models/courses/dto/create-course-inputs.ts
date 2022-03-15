import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCourseInput {
  @Field()
  name: string;
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
