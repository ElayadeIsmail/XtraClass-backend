import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Course } from '../courses/Course';
import { Student } from '../students/Student';

@ObjectType()
export class StudentCourse {
  @Field(() => Int)
  id: number;
  @Field(() => Int)
  studentId: number;
  @Field(() => Student, { nullable: true })
  student?: Student;
  @Field(() => Int)
  courseId: number;
  @Field(() => Course)
  course: Course;
  @Field(() => Float)
  price: number;
}
