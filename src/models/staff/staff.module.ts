import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { UsersModule } from '../users/users.module';
import { StaffResolver } from './staff.resolver';
import { StaffService } from './staff.service';

@Module({
  imports: [UsersModule],
  providers: [StaffResolver, StaffService, PrismaService],
})
export class StaffModule {}
