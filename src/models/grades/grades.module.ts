import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { GradesResolver } from './grades.resolver';
import { GradesService } from './grades.service';

@Module({
  providers: [GradesResolver, GradesService, PrismaService],
})
export class GradesModule {}
