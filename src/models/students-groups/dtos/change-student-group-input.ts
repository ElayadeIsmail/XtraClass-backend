import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class changeStudentGroup {
  @Field(() => Int)
  studentId: number;
  @Field(() => Int)
  newGroupId: number;
  @Field(() => Int)
  oldGroupId: number;
}

@InputType()
export class changeStudentsGroup {
  @Field(() => [Int])
  studentsIds: number[];
  @Field(() => Int)
  newGroupId: number;
  @Field(() => Int)
  oldGroupId: number;
}
