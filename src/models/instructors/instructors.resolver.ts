import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateInstructorInputs } from './dtos/create-instructor-inputs';
import { InstructorFilterInputs } from './dtos/instructor-filter-inputs';
import { Instructor } from './Instructor';
import { InstructorsService } from './instructors.service';

@Resolver(() => Instructor)
export class InstructorsResolver {
  constructor(private readonly instructorsService: InstructorsService) {}

  @Mutation(() => Instructor)
  addInstructor(@Args('inputs') inputs: CreateInstructorInputs) {
    return this.instructorsService.createInstructor(inputs);
  }

  @Query(() => Instructor)
  instructor(@Args('id', { type: () => Int }) id: number) {
    return this.instructorsService.findOne(id);
  }
  @Query(() => [Instructor])
  instructors(@Args('args') args: InstructorFilterInputs) {
    return this.instructorsService.find(args);
  }

  @Mutation(() => Instructor)
  deleteInstructor(@Args('id', { type: () => Int }) id: number) {
    return this.instructorsService.delete(id);
  }
}
