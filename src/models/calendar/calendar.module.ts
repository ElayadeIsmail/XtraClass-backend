import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CalendarResolver } from './calendar.resolver';
import { CalendarService } from './calendar.service';

@Module({
  providers: [CalendarResolver, CalendarService, PrismaService],
})
export class CalendarModule {}
