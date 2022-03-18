import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { InstructorsGroupsResolver } from './instructors-groups.resolver';
import { InstructorsGroupsService } from './instructors-groups.service';

@Module({
  providers: [
    InstructorsGroupsResolver,
    InstructorsGroupsService,
    PrismaService,
  ],
})
export class InstructorsGroupsModule {}
