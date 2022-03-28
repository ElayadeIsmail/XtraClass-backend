import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateGradeInputs } from './dto/create-grade.inputs';
import { Grade } from './Grade';
import { GradesService } from './grades.service';
import { LevelsService } from './levels.service';

@Resolver()
export class GradesResolver {
  constructor(
    private readonly gradesService: GradesService,
    private readonly levelsService: LevelsService,
  ) {}

  @Mutation(() => Grade)
  createGrade(@Args('inputs') inputs: CreateGradeInputs) {
    return this.gradesService.create(inputs);
  }

  @Query(() => Grade)
  findOneGrade(@Args('id', { type: () => Int }) id: number) {
    return this.gradesService.findOne(id);
  }
  @Query(() => [Grade])
  findGrades() {
    return this.gradesService.find();
  }
  @Query(() => [Grade])
  findLevels(@Args('gradeId', { type: () => Int }) gradeId: number) {
    return this.levelsService.find(gradeId);
  }
}
