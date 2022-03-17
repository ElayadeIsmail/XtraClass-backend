import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { StudentsCoursesResolver } from './students-courses.resolver';
import { StudentsCoursesService } from './students-courses.service';

@Module({
  providers: [StudentsCoursesResolver, StudentsCoursesService, PrismaService],
})
export class StudentsCoursesModule {}
