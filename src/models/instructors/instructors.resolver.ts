import { Resolver } from '@nestjs/graphql';
import { InstructorsService } from './instructors.service';

@Resolver()
export class InstructorsResolver {
  constructor(private readonly instructorsService: InstructorsService) {}
}
