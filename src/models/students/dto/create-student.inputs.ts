import { Field, InputType, Int } from '@nestjs/graphql';
import { CreateUserInputs } from 'src/models/users/dtos/create-user.inputs';

@InputType()
export class CreateStudentInputs extends CreateUserInputs {
  @Field(() => Int)
  levelId: number;

  @Field(() => Int)
  gradeId: number;

  @Field(() => Int, { nullable: true })
  specializationId: number;
}
