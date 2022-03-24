import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { SubjectsResolver } from './subjects.resolver';
import { SubjectsService } from './subjects.service';

@Module({
  providers: [SubjectsResolver, SubjectsService, PrismaService],
})
export class SubjectsModule {}
