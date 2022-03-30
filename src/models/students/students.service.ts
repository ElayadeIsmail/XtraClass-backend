import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaPromise, Role } from '@prisma/client';
import slugify from 'slugify';
import { PasswordManager } from 'src/services/password.service';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateStudentInputs } from './dto/create-student.inputs';
import { Student } from './Student';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  async createStudent(inputs: CreateStudentInputs): Promise<Student> {
    const { levelId, gradeId, specializationId, ...userInput } = inputs;
    const username = slugify(inputs.firstName + ' ' + inputs.lastName);
    const nameAlreadyExistPromise = this.prisma.user.findUnique({
      where: {
        username,
      },
    });
    const phoneAlreadyExistPromise = this.prisma.user.findUnique({
      where: {
        phone: userInput.phone,
      },
    });
    if (userInput.cin) {
      const cinAlreadyExist = await this.prisma.user.findUnique({
        where: {
          cin: userInput?.cin,
        },
      });
      if (cinAlreadyExist) {
        throw new BadRequestException('CIN already exist');
      }
    }
    const fullNameAlreadyExistPromise = this.prisma.user.findUnique({
      where: {
        fullName: {
          firstName: userInput.firstName,
          lastName: userInput.lastName,
        },
      },
    });
    // check if username of phone number in use
    const checksResult = await Promise.all([
      nameAlreadyExistPromise,
      phoneAlreadyExistPromise,
      fullNameAlreadyExistPromise,
    ]);
    const fields = ['username', 'phone', 'firstName and lastName'];
    checksResult.forEach((user, idx) => {
      if (user) {
        throw new BadRequestException(`${fields[idx]} Already exist`);
      }
    });
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
    const generatedPassword = PasswordManager.generatePassword();
    const hashedPassword = await PasswordManager.hash(generatedPassword);
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
            ...userInput,
            username,
            password: hashedPassword,
            generatedPassword,
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

  async find(): Promise<Student[]> {
    return this.prisma.student.findMany({
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
