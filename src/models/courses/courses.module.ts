import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CoursesResolver } from './courses.resolver';
import { CoursesService } from './courses.service';

@Module({
  providers: [CoursesResolver, CoursesService, PrismaService],
})
export class CoursesModule {}
