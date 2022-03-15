import { Resolver } from '@nestjs/graphql';
import { CoursesService } from './courses.service';

@Resolver()
export class CoursesResolver {
  constructor(private readonly coursesService: CoursesService) {}
}
