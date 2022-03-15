import { ObjectType } from '@nestjs/graphql';
import { CreateUserInputs } from 'src/models/users/dtos/create-user.inputs';

@ObjectType()
export class CreateInstructorInputs extends CreateUserInputs {}
