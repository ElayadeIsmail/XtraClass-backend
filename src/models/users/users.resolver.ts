import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { UpdateUserInputs } from './dtos/update-user-inputs';
import { User } from './User';
import { UsersService } from './users.service';
@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  updateUserInformation(
    @Args('userId', { type: () => Int }) id: number,
    @Args('inputs') inputs: UpdateUserInputs,
  ) {
    return this.usersService.updateUserInformation(id, inputs);
  }
}
