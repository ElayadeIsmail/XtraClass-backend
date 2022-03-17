import { Field, Float, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';

export class AddStudentToCourse {
  @Field(() => Int)
  studentId: number;
  @Field(() => Int)
  courseId: number;
  @Field(() => Int)
  groupId: number;
  @Min(0)
  @Field(() => Float, { nullable: true })
  price?: number;
}
