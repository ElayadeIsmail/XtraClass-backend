import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { Group } from '../groups/Group';
import { InstructorsGroupsService } from './instructors-groups.service';

@Resolver()
export class InstructorsGroupsResolver {
  constructor(
    private readonly instructorGroupsService: InstructorsGroupsService,
  ) {}

  @Mutation(() => Group)
  changeGroupInstructor(
    @Args('instructorId', { type: () => Int }) instructorId: number,
    @Args('groupId', { type: () => Int }) groupId: number,
  ) {
    return this.instructorGroupsService.changeGroupInstructor(
      instructorId,
      groupId,
    );
  }
}
