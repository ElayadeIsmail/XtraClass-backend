import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Specialization {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}
