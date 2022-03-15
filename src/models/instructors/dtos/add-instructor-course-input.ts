import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class AddInstructorCourse {
  @Field(() => Int)
  instructorId: number;
  @Field(() => Int)
  courseId: number;
  @Field(() => Float)
  percentage: number;
}
