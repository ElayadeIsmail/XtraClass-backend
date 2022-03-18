import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { Course } from './Course';
import { CoursesService } from './courses.service';
import { CreateCourseInput } from './dto/create-course-inputs';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(private readonly coursesService: CoursesService) {}

  @Mutation(() => Course)
  createCourse(@Args('inputs') inputs: CreateCourseInput): Promise<Course> {
    return this.coursesService.createCourse(inputs);
  }

  @Mutation(() => Course)
  updateCourseName(
    @Args('courseId', { type: () => Int }) courseId: number,
    @Args('name') name: string,
  ): Promise<Course> {
    return this.coursesService.updateCourseName({ courseId, name });
  }
}
