import { Field, Float, InputType } from '@nestjs/graphql';
import { CreateUserInputs } from 'src/models/users/dtos/create-user.inputs';

@InputType()
export class AddStaffInput extends CreateUserInputs {
  @Field(() => Float)
  salary: number;
}
