import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { GroupsResolver } from './groups.resolver';
import { GroupsService } from './groups.service';

@Module({
  providers: [GroupsResolver, GroupsService, PrismaService],
})
export class GroupsModule {}
