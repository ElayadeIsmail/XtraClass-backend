import { Resolver } from '@nestjs/graphql';
import { ParentsService } from './parents.service';

@Resolver()
export class ParentsResolver {
  constructor(private readonly parentsService: ParentsService) {}
}
