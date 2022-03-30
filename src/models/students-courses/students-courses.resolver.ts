import { Args, Float, Int, Mutation, Resolver } from '@nestjs/graphql';
import { AddStudentToCourse } from './dtos/add-student-course';
import { StudentCourse } from './StudentCourse';
import { StudentsCoursesService } from './students-courses.service';

@Resolver()
export class StudentsCoursesResolver {
  constructor(
    private readonly studentsCoursesService: StudentsCoursesService,
  ) {}

  @Mutation(() => StudentCourse)
  addStudentToCourse(@Args('inputs') inputs: AddStudentToCourse) {
    return this.studentsCoursesService.addStudentToCourse(inputs);
  }

  @Mutation(() => StudentCourse)
  updateStudentCourse(
    @Args('price', { type: () => Float }) price: number,
    @Args('studentCourseId', { type: () => Int }) studentCourseId: number,
  ) {
    return this.studentsCoursesService.updateStudentCourse(
      price,
      studentCourseId,
    );
  }
  @Mutation(() => StudentCourse)
  deletetudentCourse(
    @Args('studentCourseId', { type: () => Int }) studentCourseId: number,
  ) {
    return this.studentsCoursesService.removeStudentCourse(studentCourseId);
  }
}
