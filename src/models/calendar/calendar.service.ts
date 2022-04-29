import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateCalendarSession } from './dto/create-calendar-inputs';
import { UpdateCalendarSession } from './dto/update-calendar-session';

@Injectable()
export class CalendarService {
  constructor(private readonly prisma: PrismaService) {}

  async create(inputs: CreateCalendarSession[]) {
    // ! TODO check if groupId is Valid
    // ! TODO check if the sale is empty
    return this.prisma.calendar.createMany({
      data: inputs,
    });
  }
  async createOne(inputs: CreateCalendarSession) {
    // ! TODO check if groupId is Valid
    // ! TODO check if the sale is empty
    return this.prisma.calendar.create({
      data: inputs,
    });
  }

  async find() {
    return this.prisma.calendar.findMany({});
  }

  async update(id: number, inputs: UpdateCalendarSession) {
    const calendarSession = await this.prisma.calendar.findUnique({
      where: {
        id,
      },
    });
    if (calendarSession) {
      throw new NotFoundException();
    }
    return this.prisma.calendar.update({
      where: {
        id,
      },
      data: inputs,
    });
  }
  async remove(id: number) {
    const calendarSession = await this.prisma.calendar.findUnique({
      where: {
        id,
      },
    });
    if (calendarSession) {
      throw new NotFoundException();
    }
    return this.prisma.calendar.delete({
      where: {
        id,
      },
    });
  }
}
