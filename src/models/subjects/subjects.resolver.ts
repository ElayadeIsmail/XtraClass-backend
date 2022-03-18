import { Resolver } from '@nestjs/graphql';
import { SubjectsService } from './subjects.service';

@Resolver()
export class SubjectsResolver {
  constructor(private readonly subjectsService: SubjectsService) {}
}
