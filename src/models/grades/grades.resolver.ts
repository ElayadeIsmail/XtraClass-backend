import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateGradeInputs } from './dto/create-grade.inputs';
import { Grade } from './Grade';
import { GradesService } from './grades.service';

@Resolver()
export class GradesResolver {
  constructor(private readonly gradesService: GradesService) {}

  @Mutation(() => Grade)
  createGrade(@Args('inputs') inputs: CreateGradeInputs) {
    return this.gradesService.create(inputs);
  }
}
