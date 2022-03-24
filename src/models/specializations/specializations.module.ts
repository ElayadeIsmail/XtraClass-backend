import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { SpecializationsResolver } from './specializations.resolver';
import { SpecializationsService } from './specializations.service';

@Module({
  providers: [SpecializationsResolver, SpecializationsService, PrismaService],
})
export class SpecializationsModule {}
