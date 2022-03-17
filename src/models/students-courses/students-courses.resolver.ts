import { Resolver } from '@nestjs/graphql';
import { StudentsCoursesService } from './students-courses.service';

@Resolver()
export class StudentsCoursesResolver {
  constructor(
    private readonly studentsCoursesService: StudentsCoursesService,
  ) {}
}
