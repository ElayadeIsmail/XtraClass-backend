import { Resolver } from '@nestjs/graphql';
import { GradesService } from './grades.service';

@Resolver()
export class GradesResolver {
  constructor(private readonly gradesService: GradesService) {}
}
