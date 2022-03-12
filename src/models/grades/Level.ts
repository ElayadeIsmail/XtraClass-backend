import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Grade } from './Grade';

@ObjectType()
export class Level {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => Int)
  gradeId: number;

  @Field(() => Grade, { nullable: true })
  grade?: Grade;
}
