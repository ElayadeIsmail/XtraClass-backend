import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class addStudentToGroup {
  @Field(() => Int)
  studentId: number;
  @Field(() => Int)
  groupId: number;
}

@InputType()
export class addStudentsToGroup {
  @Field(() => [Int])
  studentsIds: number[];
  @Field(() => Int)
  groupId: number;
}
