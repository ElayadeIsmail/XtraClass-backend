import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommonFindInputs } from 'src/common/inputs/common-find-inputs';
import { AddStaffInput } from './dto/add-staff-inputs';
import { Staff } from './Staff';
import { StaffService } from './staff.service';

@Resolver()
export class StaffResolver {
  constructor(private readonly staffService: StaffService) {}

  @Mutation(() => Staff)
  addStaffMember(@Args('inputs') inputs: AddStaffInput): Promise<Staff> {
    return this.staffService.create(inputs);
  }

  @Query(() => Staff)
  staffMember(@Args('id', { type: () => Int }) id: number) {
    return this.staffService.findOne(id);
  }

  @Query(() => Staff)
  staffMembers(@Args('args') args: CommonFindInputs) {
    return this.staffService.find(args);
  }

  @Mutation(() => Staff)
  removeStaffMember(@Args('id', { type: () => Int }) id: number) {
    return this.staffService.delete(id);
  }
}
