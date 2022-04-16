import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, PrismaPromise, Role } from '@prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { CreateStudentInputs } from './dto/create-student.inputs';
import { StudentFilterInputs } from './dto/students-filter-inputs';
import { Student } from './Student';

@Injectable()
export class StudentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UsersService,
  ) {}

  async createStudent(inputs: CreateStudentInputs): Promise<Student> {
    const { levelId, gradeId, specializationId, ...userInput } = inputs;
    const validUserInputs = await this.userService.validateUserInputs(
      userInput,
    );
    const levelPromise = this.prisma.level.findUnique({
      where: {
        id: levelId,
      },
    });
    const gradePromise = this.prisma.grade.findUnique({
      where: {
        id: gradeId,
      },
    });
    const [level, grade] = await Promise.all([levelPromise, gradePromise]);
    if (!level || !grade) {
      const field = level ? 'grade' : 'level';
      throw new BadRequestException(`${field} does not found`);
    }
    if (level.gradeId !== gradeId) {
      throw new BadRequestException('Level must be for grad ');
    }
    if (inputs.specializationId) {
      const specialization = await this.prisma.specialization.findUnique({
        where: {
          id: inputs.specializationId,
        },
      });
      if (!specialization) {
        throw new BadRequestException('specialization does not exist');
      }
    }
    return this.prisma.student.create({
      include: {
        user: true,
        grade: true,
        level: true,
        specialization: true,
      },
      data: {
        level: {
          connect: {
            id: levelId,
          },
        },
        specialization: {
          connect: {
            id: specializationId,
          },
        },
        grade: {
          connect: {
            id: gradeId,
          },
        },
        user: {
          create: {
            ...validUserInputs,
            role: Role.Student,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<Student> {
    const student = await this.prisma.student.findUnique({
      where: {
        id,
      },
      include: {
        _count: true,
        parent: true,
        user: true,
        grade: true,
        level: true,
        specialization: true,
        courses: {
          include: { course: true },
        },
        groups: true,
      },
    });
    if (!student) {
      throw new NotFoundException();
    }
    return student;
  }

  async find(args: StudentFilterInputs): Promise<Student[]> {
    const { limit, name, page, ...rest } = args;
    const where: Prisma.StudentWhereInput = { ...rest };
    where.user = {
      username: {
        contains: name,
        mode: 'insensitive',
      },
    };
    const skip = limit == -1 ? undefined : (page - 1) * limit;
    return this.prisma.student.findMany({
      where,
      skip,
      take: limit == -1 ? undefined : limit,
      include: {
        _count: true,
        user: true,
        level: true,
        grade: true,
        specialization: true,
      },
    });
  }

  async delete(id: number): Promise<Student> {
    const student = await this.prisma.student.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        level: true,
        grade: true,
        specialization: true,
        parent: {
          select: {
            id: true,
            userId: true,
            _count: {
              select: {
                students: true,
              },
            },
          },
        },
      },
    });
    if (!student) {
      throw new NotFoundException();
    }
    const prismaPromises: PrismaPromise<any>[] = [
      this.prisma.student.delete({ where: { id } }),
      this.prisma.user.delete({
        where: {
          id: student.userId,
        },
      }),
    ];
    if (student.parent._count.students === 1) {
      prismaPromises.push(
        this.prisma.parent.delete({
          where: {
            id: student.parentId,
          },
        }),
      );
      prismaPromises.push(
        this.prisma.user.delete({
          where: {
            id: student.parent.userId,
          },
        }),
      );
    }
    await this.prisma.$transaction(prismaPromises);
    return student;
  }
}
