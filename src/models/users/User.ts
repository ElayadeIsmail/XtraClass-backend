import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Role } from '@prisma/client';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  username: string;

  password: string;

  @Field()
  generatedPassword: string;

  @Field()
  isPasswordChanged: boolean;

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

  @Field(() => Date)
  birthDate: Date;

  @Field(() => Role)
  role: Role;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
