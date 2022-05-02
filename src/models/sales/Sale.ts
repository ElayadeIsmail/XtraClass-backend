import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Sale {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}
