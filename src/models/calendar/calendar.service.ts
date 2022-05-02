import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    if (inputs.from >= inputs.to) {
      throw new BadRequestException('start time cannot be greater than finish');
    }
    const [group, sale] = await Promise.all([
      this.prisma.group.findUnique({
        where: { id: inputs.groupId },
      }),
      this.prisma.sale.findUnique({
        where: {
          id: inputs.saleId,
        },
      }),
    ]);
    if (!group) {
      throw new BadRequestException('group not found');
    }
    if (!sale) {
      throw new BadRequestException('sale not found');
    }
    const saleReserved = await this.prisma.calendar.findFirst({
      where: {
        day: inputs.day,
        saleId: inputs.saleId,
        AND: [
          {
            OR: [
              {
                from: {
                  gt: inputs.from,
                  lte: inputs.to,
                },
              },
              {
                to: {
                  gt: inputs.from,
                  lte: inputs.to,
                },
              },
            ],
          },
        ],
      },
    });
    if (saleReserved) {
      throw new BadRequestException('Sale is reserved fin this time');
    }
    return this.prisma.calendar.create({
      data: inputs,
    });
  }

  async find() {
    return this.prisma.calendar.findMany({
      include: {
        group: {
          include: {
            course: {
              include: {
                level: true,
                specialization: true,
                subject: true,
              },
            },
          },
        },
        sale: true,
      },
    });
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
