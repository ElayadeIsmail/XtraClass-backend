import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateInstructorInputs } from './dtos/create-instructor-inputs';
import { Instructor } from './Instructor';
import { InstructorsService } from './instructors.service';

@Resolver((of) => Instructor)
export class InstructorsResolver {
  constructor(private readonly instructorsService: InstructorsService) {}

  @Mutation(() => Instructor)
  async createInstructor(@Args('inputs') inputs: CreateInstructorInputs) {
    return this.instructorsService.createInstructor(inputs);
  }
}
