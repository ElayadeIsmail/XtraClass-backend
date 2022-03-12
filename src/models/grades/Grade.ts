import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Level } from './Level';

@ObjectType()
export class Grade {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [Level], { nullable: true })
  levels?: Level[];
}
