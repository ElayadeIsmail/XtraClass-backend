import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { GradesResolver } from './grades.resolver';
import { GradesService } from './grades.service';
import { LevelsService } from './levels.service';

@Module({
  providers: [GradesResolver, GradesService, LevelsService, PrismaService],
})
export class GradesModule {}
