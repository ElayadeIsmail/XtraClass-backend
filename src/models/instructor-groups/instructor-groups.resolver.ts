import { Resolver } from '@nestjs/graphql';
import { InstructorGroupsService } from './instructor-groups.service';

@Resolver()
export class InstructorGroupsResolver {
  constructor(private readonly instructorGroupsService: InstructorGroupsService) {}
}
