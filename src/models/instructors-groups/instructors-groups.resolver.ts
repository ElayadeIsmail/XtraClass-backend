import { Resolver } from '@nestjs/graphql';
import { InstructorsGroupsService } from './instructors-groups.service';

@Resolver()
export class InstructorsGroupsResolver {
  constructor(
    private readonly instructorGroupsService: InstructorsGroupsService,
  ) {}
}
