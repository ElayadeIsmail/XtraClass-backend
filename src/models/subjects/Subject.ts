import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Subject {
  @Field(() => Int)
  id: number;
  @Field()
  name: string;
}
