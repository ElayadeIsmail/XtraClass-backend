import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { StaffResolver } from './staff.resolver';
import { StaffService } from './staff.service';

@Module({
  providers: [StaffResolver, StaffService, PrismaService],
})
export class StaffModule {}
