import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateInstructorInputs } from './dtos/create-instructor-inputs';
import { Instructor } from './Instructor';
import { InstructorsService } from './instructors.service';

@Resolver(() => Instructor)
export class InstructorsResolver {
  constructor(private readonly instructorsService: InstructorsService) {}

  @Mutation(() => Instructor)
  async createInstructor(@Args('inputs') inputs: CreateInstructorInputs) {
    return this.instructorsService.createInstructor(inputs);
  }

  @Query(() => Instructor)
  findOneInstructor(@Args('id', { type: () => Int }) id: number) {
    return this.instructorsService.findOne(id);
  }
  @Query(() => [Instructor])
  findInstructors() {
    return this.instructorsService.find();
  }

  @Mutation(() => Instructor)
  deleteInstructor(@Args('id', { type: () => Int }) id: number) {
    return this.instructorsService.delete(id);
  }
}
