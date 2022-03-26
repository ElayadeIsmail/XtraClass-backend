import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Course } from '../courses/Course';

@ObjectType()
export class Group {
  @Field(() => Int)
  id: number;
  @Field()
  name: string;
  @Field(() => Int)
  courseId: number;
  @Field(() => Course, { nullable: true })
  course?: Course;
  @Field(() => Int)
  instructorId: number;
}
