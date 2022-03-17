import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { InstructorGroupsResolver } from './instructor-groups.resolver';
import { InstructorGroupsService } from './instructor-groups.service';

@Module({
  providers: [InstructorGroupsResolver, InstructorGroupsService, PrismaService],
})
export class InstructorGroupsModule {}
