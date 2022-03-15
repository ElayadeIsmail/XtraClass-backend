import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsResolver } from './groups.resolver';

@Module({
  providers: [GroupsResolver, GroupsService]
})
export class GroupsModule {}
