import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCourseInput {
  @Field()
  name: string;
  @Field(() => Int)
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
