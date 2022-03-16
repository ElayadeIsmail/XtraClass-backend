import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { StudentsGroupsResolver } from './students-groups.resolver';
import { StudentsGroupsService } from './students-groups.service';

@Module({
  providers: [StudentsGroupsResolver, StudentsGroupsService, PrismaService],
})
export class StudentsGroupsModule {}
