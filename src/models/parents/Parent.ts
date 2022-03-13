import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Student } from '../students/Student';
import { User } from '../users/User';

@ObjectType()
export class Parent {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  userId: number;

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => [Student])
  students: Student[];
}
