import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { InstructorsCoursesResolver } from './instructors-courses.resolver';
import { InstructorsCoursesService } from './instructors-courses.service';

@Module({
  providers: [
    InstructorsCoursesResolver,
    InstructorsCoursesService,
    PrismaService,
  ],
})
export class InstructorsCoursesModule {}
