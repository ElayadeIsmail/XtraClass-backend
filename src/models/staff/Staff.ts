import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../users/User';

@ObjectType()
export class Staff {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  userId: number;

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => Float)
  salary: number;
}
