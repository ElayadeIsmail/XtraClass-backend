import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { InstructorsResolver } from './instructors.resolver';
import { InstructorsService } from './instructors.service';

@Module({
  providers: [InstructorsResolver, InstructorsService, PrismaService],
})
export class InstructorsModule {}
