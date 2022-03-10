import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Student {
  @Field(() => Int)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field({ nullable: true })
  photo?: string;

  @Field({ nullable: true })
  cin?: string;

  @Field()
  phone: string;

  @Field()
  address: string;

  @Field(() => Int)
  userId: number;

  @Field(() => Date)
  birthDate: Date;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
