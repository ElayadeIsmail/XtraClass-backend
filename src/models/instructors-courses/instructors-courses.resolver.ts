import { Resolver } from '@nestjs/graphql';
import { InstructorsCoursesService } from './instructors-courses.service';

@Resolver()
export class InstructorsCoursesResolver {
  constructor(
    private readonly instructorsCoursesService: InstructorsCoursesService,
  ) {}
}
