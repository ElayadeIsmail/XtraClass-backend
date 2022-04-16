import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { UsersModule } from '../users/users.module';
import { InstructorsResolver } from './instructors.resolver';
import { InstructorsService } from './instructors.service';

@Module({
  imports: [UsersModule],
  providers: [InstructorsResolver, InstructorsService, PrismaService],
})
export class InstructorsModule {}
