import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateGroupInputs {
  @Field()
  name: string;
  @Field(() => Int)
  courseId: number;
  @Field(() => Int)
  instructorId: number;
}
