import { Args, Float, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Course } from './Course';
import { CoursesService } from './courses.service';
import { CourseFilterInputs } from './dto/course-filter-inputs';
import { CreateCourseInput } from './dto/create-course-inputs';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(private readonly coursesService: CoursesService) {}

  @Query(() => Course)
  course(@Args('id', { type: () => Int }) id: number): Promise<Course> {
    return this.coursesService.findOne(id);
  }
  @Query(() => [Course])
  courses(@Args('args') args: CourseFilterInputs): Promise<Course[]> {
    return this.coursesService.find(args);
  }
  @Mutation(() => Course)
  addCourse(@Args('inputs') inputs: CreateCourseInput): Promise<Course> {
    return this.coursesService.createCourse(inputs);
  }

  @Mutation(() => Course)
  updateCourseName(
    @Args('courseId', { type: () => Int }) courseId: number,
    @Args('name') name: string,
  ): Promise<Course> {
    return this.coursesService.updateCourseName({ courseId, name });
  }

  @Mutation(() => Course)
  updateCoursePrice(
    @Args('courseId', { type: () => Int }) courseId: number,
    @Args('price', { type: () => Float }) price: number,
    @Args('updateForStudents') updateForStudents: boolean,
  ): Promise<Course> {
    return this.coursesService.updateCoursePrice({
      courseId,
      price,
      updateForStudents,
    });
  }

  @Mutation(() => Course)
  deleteCourse(
    @Args('courseId', { type: () => Int }) courseId: number,
  ): Promise<Course> {
    return this.coursesService.removeCourse(courseId);
  }
}
