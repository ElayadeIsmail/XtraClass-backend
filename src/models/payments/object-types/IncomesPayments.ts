import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Course } from 'src/models/courses/Course';
import { Student } from 'src/models/students/Student';

@ObjectType()
export class IncomesPayments {
  @Field(() => Int)
  id: number;
  @Field()
  amount: number;
  @Field(() => Int)
  studentId: number;
  @Field(() => Student, { nullable: true })
  student?: Student;
  @Field(() => Int)
  courseId: number;
  @Field(() => Course, { nullable: true })
  course?: Course;
  @Field(() => Int)
  year: number;
  @Field(() => Int)
  month: number;
  @Field()
  payedAt: Date;
}
