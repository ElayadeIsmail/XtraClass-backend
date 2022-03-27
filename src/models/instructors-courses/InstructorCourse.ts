import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Course } from '../courses/Course';

@ObjectType()
export class InstructorCourse {
  @Field(() => Int)
  id: number;
  @Field(() => Int)
  instructorId: number;
  @Field(() => Int)
  courseId: number;
  @Field(() => Course, { nullable: true })
  course?: Course;
  @Field(() => Float)
  percentage: number;
}
