import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Course {
  @Field(() => Int)
  id: number;
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
