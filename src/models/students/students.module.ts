import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { StudentsResolver } from './students.resolver';
import { StudentsService } from './students.service';

@Module({
  providers: [StudentsResolver, StudentsService, PrismaService],
})
export class StudentsModule {}
