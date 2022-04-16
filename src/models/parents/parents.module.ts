import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { UsersModule } from '../users/users.module';
import { ParentsResolver } from './parents.resolver';
import { ParentsService } from './parents.service';

@Module({
  imports: [UsersModule],
  providers: [ParentsResolver, ParentsService, PrismaService],
})
export class ParentsModule {}
