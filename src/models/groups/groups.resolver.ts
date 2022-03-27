import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateGroupInputs } from './dtos/create-group-inputs';
import { Group } from './Group';
import { GroupsService } from './groups.service';

@Resolver()
export class GroupsResolver {
  constructor(private readonly groupsService: GroupsService) {}

  @Mutation(() => Group)
  async createGroup(@Args('inputs') inputs: CreateGroupInputs) {
    return this.groupsService.createGroup(inputs);
  }

  @Query(() => Group)
  async findOneGroup(@Args('id', { type: () => Int }) id: number) {
    return this.groupsService.findOne(id);
  }
  @Query(() => [Group])
  async findGroups() {
    return this.groupsService.find();
  }
  @Mutation(() => Group)
  async deleteGroup(@Args('id', { type: () => Int }) id: number) {
    return this.groupsService.delete(id);
  }
}
