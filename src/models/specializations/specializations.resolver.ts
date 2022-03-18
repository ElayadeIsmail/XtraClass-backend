import { Resolver } from '@nestjs/graphql';
import { SpecializationsService } from './specializations.service';

@Resolver()
export class SpecializationsResolver {
  constructor(private readonly specializationsService: SpecializationsService) {}
}
