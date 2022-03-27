import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Group } from '../groups/Group';
import { InstructorCourse } from '../instructors-courses/InstructorCourse';
import { User } from '../users/User';

@ObjectType()
export class InstructorCount {
  @Field(() => Int)
  groups: number;
  @Field(() => Int)
  courses: number;
}

@ObjectType()
export class Instructor {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  userId: number;

  @Field(() => InstructorCount, { nullable: true })
  _count?: InstructorCount;

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => [Group], { nullable: true })
  groups?: Group[];
  @Field(() => [InstructorCourse], { nullable: true })
  courses?: InstructorCourse[];
}
