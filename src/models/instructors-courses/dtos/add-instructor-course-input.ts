import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';

@InputType()
export class AddInstructorCourseInputs {
  @Field(() => Int)
  instructorId: number;
  @Field(() => Int)
  courseId: number;
  @Min(0)
  @Field(() => Float)
  percentage: number;
}
