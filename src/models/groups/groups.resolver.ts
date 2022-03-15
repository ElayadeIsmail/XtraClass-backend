import { Resolver } from '@nestjs/graphql';
import { GroupsService } from './groups.service';

@Resolver()
export class GroupsResolver {
  constructor(private readonly groupsService: GroupsService) {}
}
