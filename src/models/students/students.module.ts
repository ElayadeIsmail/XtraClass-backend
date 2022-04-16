import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { UsersModule } from '../users/users.module';
import { StudentsResolver } from './students.resolver';
import { StudentsService } from './students.service';

@Module({
  imports: [UsersModule],
  providers: [StudentsResolver, StudentsService, PrismaService],
})
export class StudentsModule {}
