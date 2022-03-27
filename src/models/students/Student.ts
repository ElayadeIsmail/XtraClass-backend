import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Grade } from '../grades/Grade';
import { Level } from '../grades/Level';
import { Group } from '../groups/Group';
import { Parent } from '../parents/Parent';
import { StudentCourse } from '../students-courses/StudentCourse';
import { User } from '../users/User';

@ObjectType()
export class StudentsCount {
  @Field(() => Int)
  courses: number;
  @Field(() => Int)
  groups: number;
}

@ObjectType()
export class Student {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  levelId: number;

  @Field(() => Int)
  gradeId: number;

  @Field(() => Grade, { nullable: true })
  grade?: Grade;

  @Field(() => Level, { nullable: true })
  level?: Level;

  @Field(() => StudentsCount, { nullable: true })
  _count?: StudentsCount;

  @Field(() => Int, { nullable: true })
  parentId?: number;

  @Field(() => Parent, { nullable: true })
  parent?: Parent;

  @Field(() => [Group], { nullable: true })
  groups?: Group[];

  @Field(() => Int)
  userId: number;

  @Field(() => [StudentCourse], { nullable: true })
  courses?: StudentCourse[];

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
