import { Resolver } from '@nestjs/graphql';
import { StudentsService } from './students.service';

@Resolver()
export class StudentsResolver {
  constructor(private readonly studentsService: StudentsService) {}
}
