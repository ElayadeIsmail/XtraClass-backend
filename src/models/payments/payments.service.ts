import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { IncomesPaymentsInput } from './inputs/incomes-payments-inputs';
import { OutGoingPaymentsInput } from './inputs/outgoing-payments-inputs';
import { PaymentsFilterInput } from './inputs/payments-filter-inputs';
import { Payments, PaymentType } from './object-types/Payments';

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

  async payments(inputs: PaymentsFilterInput): Promise<Payments[]> {
    const { type, month, year } = inputs;
    let args: Prisma.PaymentsFindManyArgs = {};
    if (type === PaymentType.InComing) {
      args = {
        where: {
          outgoingPaymentId: null,
          incomesPaymentId: {
            not: null,
          },
          incomesPayment: {
            month,
            year,
          },
        },
        include: {
          incomesPayment: {
            include: {
              course: true,
              student: true,
            },
          },
        },
      };
    } else {
      args = {
        where: {
          incomesPaymentId: null,
          outgoingPaymentId: {
            not: null,
          },
          outgoingPayment: {
            month,
            year,
          },
        },
        include: {
          outgoingPayment: {
            include: {
              instructor: true,
              staff: true,
            },
          },
        },
      };
    }
    return this.prisma.payments.findMany(args);
  }
}
