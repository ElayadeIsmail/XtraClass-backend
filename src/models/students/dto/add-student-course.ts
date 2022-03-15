import { Field, Float, Int } from '@nestjs/graphql';

export class AddStudentCourse {
  @Field(() => Int)
  studentId: number;
  @Field(() => Int)
  courseId: number;
  @Field(() => Float)
  price?: number;
}
