import { Resolver } from '@nestjs/graphql';
import { StudentsGroupsService } from './students-groups.service';

@Resolver()
export class StudentsGroupsResolver {
  constructor(private readonly studentsGroupsService: StudentsGroupsService) {}
}
