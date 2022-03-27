import { Args, Float, Int, Mutation, Resolver } from '@nestjs/graphql';
import { AddInstructorCourseInputs } from './dtos/add-instructor-course-input';
import { InstructorCourse } from './InstructorCourse';
import { InstructorsCoursesService } from './instructors-courses.service';

@Resolver()
export class InstructorsCoursesResolver {
  constructor(
    private readonly instructorsCoursesService: InstructorsCoursesService,
  ) {}

  @Mutation(() => InstructorCourse)
  addInstructorToCourse(@Args('inputs') inputs: AddInstructorCourseInputs) {
    return this.instructorsCoursesService.addInstructorToCourse(inputs);
  }

  @Mutation(() => InstructorCourse)
  removeInstructorFromCourse(
    @Args('instructorCourseId', { type: () => Int }) instructorCourseId: number,
  ) {
    return this.instructorsCoursesService.removeInstructorFromCourse(
      instructorCourseId,
    );
  }
  @Mutation(() => InstructorCourse)
  updateInstructorCoursePercentage(
    @Args('instructorCourseId', { type: () => Int }) instructorCourseId: number,
    @Args('percentage', { type: () => Float }) percentage: number,
  ) {
    return this.instructorsCoursesService.updateInstructorCoursePercentage({
      instructorCourseId,
      percentage,
    });
  }
}
