import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateStudentCourse {
  @Field(() => Int)
  price: number;
  @Field(() => Int)
  studentCourseId: number;
}
