import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Course } from '../courses/Course';
import { Instructor } from '../instructors/Instructor';
import { Student } from '../students/Student';

@ObjectType()
export class GroupCount {
  @Field(() => Int)
  students: number;
}

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
  @Field(() => GroupCount, { nullable: true })
  _count?: GroupCount;
  @Field(() => Instructor, { nullable: true })
  instructor?: Instructor;
  @Field(() => [Student], { nullable: true })
  students?: Student[];
}
