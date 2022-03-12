import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../users/User';

@ObjectType()
export class Student {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  levelId: number;

  @Field(() => Int)
  gradeId: number;

  @Field(() => Int)
  userId: number;

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
