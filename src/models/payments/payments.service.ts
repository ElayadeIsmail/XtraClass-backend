import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { IncomesPaymentsInput } from './inputs/incomes-payments-inputs';
import { OutGoingPaymentsInput } from './inputs/outgoing-payments-inputs';
import { Payments } from './object-types/Payments';

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  async AddIncomesPayments(inputs: IncomesPaymentsInput): Promise<Payments> {
    const [studentAlreadyPaid, student] = await Promise.all([
      this.prisma.incomesPayments.findUnique({
        where: {
          studentId_courseId_year_month: {
            courseId: inputs.courseId,
            month: inputs.month,
            studentId: inputs.studentId,
            year: inputs.year,
          },
        },
      }),
      this.prisma.student.findUnique({
        where: {
          id: inputs.studentId,
        },
        include: {
          courses: {
            where: {
              courseId: inputs.courseId,
            },
          },
        },
      }),
    ]);
    if (studentAlreadyPaid) {
      throw new BadRequestException('Student Already paid for this course');
    }
    if (!student) {
      throw new BadRequestException('Student Not Found');
    }
    if (student.courses.length === 0) {
      throw new BadRequestException(
        'Student Does Not Have Access To this Course',
      );
    }
    if (student.courses[0].price !== inputs.amount) {
      throw new BadRequestException(
        'amount and student course price does not match',
      );
    }
    return this.prisma.payments.create({
      data: {
        incomesPayment: {
          create: inputs,
        },
      },
      include: {
        incomesPayment: true,
      },
    });
  }

  async addOutGoingPayments(inputs: OutGoingPaymentsInput): Promise<Payments> {
    if (
      (!inputs.instructorId && !inputs.staffId) ||
      (inputs.instructorId && inputs.staffId)
    ) {
      throw new BadRequestException(
        'Instructor Id or Staff Id one of them is required',
      );
    }
    const alreadyPaid = await this.prisma.outgoingPayments.findUnique({
      where: {
        instructorId_staffId_month_year: {
          instructorId: inputs.instructorId,
          staffId: inputs.staffId,
          month: inputs.month,
          year: inputs.year,
        },
      },
    });
    if (alreadyPaid) {
      throw new BadRequestException('Already Paid For this month');
    }
    if (inputs.instructorId) {
      const instructor = await this.prisma.instructor.findUnique({
        where: {
          id: inputs.instructorId,
        },
      });
      if (!instructor) {
        throw new BadRequestException('Instructor not found');
      }
    }
    if (inputs.staffId) {
      const staff = await this.prisma.staff.findUnique({
        where: {
          id: inputs.staffId,
        },
      });
      if (!staff) {
        throw new BadRequestException('staff not found');
      }
    }
    return this.prisma.payments.create({
      data: {
        outgoingPayment: {
          create: inputs,
        },
      },
      include: {
        outgoingPayment: true,
      },
    });
  }
}
