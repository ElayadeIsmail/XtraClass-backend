import { InputType } from '@nestjs/graphql';
import { CreateUserInputs } from 'src/models/users/dtos/create-user.inputs';

@InputType()
export class CreateInstructorInputs extends CreateUserInputs {}
