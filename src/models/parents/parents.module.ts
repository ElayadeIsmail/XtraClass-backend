import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { ParentsResolver } from './parents.resolver';
import { ParentsService } from './parents.service';

@Module({
  providers: [ParentsResolver, ParentsService, PrismaService],
})
export class ParentsModule {}
