import { Args, Mutation, Resolver } from '@nestjs/graphql';
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
}
