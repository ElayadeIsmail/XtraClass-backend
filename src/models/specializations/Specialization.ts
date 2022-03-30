import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Student } from '../students/Student';

@ObjectType()
export class Specialization {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [Student], { nullable: true })
  students?: Student[];
}
