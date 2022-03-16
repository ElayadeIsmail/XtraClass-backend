import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class RemoveStudentFromGroupInputs {
  @Field(() => Int)
  studentId: number;
  @Field(() => Int)
  groupId: number;
}

@InputType()
export class RemoveStudentsFromGroupInputs {
  @Field(() => Int)
  studentId: number;
  @Field(() => Int)
  groupId: number;
}
