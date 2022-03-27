import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateParentInput } from './dtos/create-parent.inputs';
import { Parent } from './Parent';
import { ParentsService } from './parents.service';

@Resolver()
export class ParentsResolver {
  constructor(private readonly parentsService: ParentsService) {}

  @Mutation(() => Parent)
  async createParent(
    @Args('inputs') inputs: CreateParentInput,
  ): Promise<Parent> {
    return this.parentsService.createParent(inputs);
  }
}
