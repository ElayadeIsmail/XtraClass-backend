import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateGradeInputs } from './dto/create-grade.inputs';
import { Grade } from './Grade';
import { GradesService } from './grades.service';
import { Level } from './Level';
import { LevelsService } from './levels.service';

@Resolver(() => Grade)
export class GradesResolver {
  constructor(
    private readonly gradesService: GradesService,
    private readonly levelsService: LevelsService,
  ) {}

  @Mutation(() => Grade)
  addGrade(@Args('inputs') inputs: CreateGradeInputs) {
    return this.gradesService.create(inputs);
  }

  @Query(() => Grade)
  grade(@Args('id', { type: () => Int }) id: number) {
    return this.gradesService.findOne(id);
  }
  @Query(() => [Grade])
  grades() {
    return this.gradesService.find();
  }
  @Query(() => [Level])
  levels(@Args('gradeId', { type: () => Int }) gradeId: number) {
    return this.levelsService.find(gradeId);
  }
}
