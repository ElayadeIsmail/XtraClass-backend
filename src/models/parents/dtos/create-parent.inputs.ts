import { Field, InputType, Int } from '@nestjs/graphql';
import { CreateUserInputs } from 'src/models/users/dtos/create-user.inputs';

@InputType()
export class CreateParentInput extends CreateUserInputs {
  @Field(() => Int)
  studentId: number;
}
