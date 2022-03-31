import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateGroupInputs } from './dtos/create-group-inputs';
import { Group } from './Group';
import { GroupsService } from './groups.service';

@Resolver()
export class GroupsResolver {
  constructor(private readonly groupsService: GroupsService) {}

  @Mutation(() => Group)
  addGroup(@Args('inputs') inputs: CreateGroupInputs) {
    return this.groupsService.createGroup(inputs);
  }

  @Query(() => Group)
  group(@Args('id', { type: () => Int }) id: number) {
    return this.groupsService.findOne(id);
  }
  @Query(() => [Group])
  groups(@Args('courseId', { type: () => Int }) courseId: number) {
    return this.groupsService.find({ courseId });
  }
  @Mutation(() => Group)
  deleteGroup(@Args('id', { type: () => Int }) id: number) {
    return this.groupsService.delete(id);
  }
}
