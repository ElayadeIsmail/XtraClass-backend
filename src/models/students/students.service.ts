import { BadRequestException, Injectable } from '@nestjs/common';
import { Role, Student } from '@prisma/client';
import { generatePassword } from 'src/helpers/generate-password';
import { PasswordManager } from 'src/services/password.service';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { AddStudentCourse } from './dto/add-student-course';
import { CreateStudentInputs } from './dto/create-student.inputs';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  async createStudent(inputs: CreateStudentInputs): Promise<Student> {
    const { levelId, gradeId, ...userInput } = inputs;
    const nameAlreadyExistPromise = this.prisma.user.findUnique({
      where: {
        username: userInput.username,
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
    const generatedPassword = generatePassword();
    const hashedPassword = await PasswordManager.hash(generatedPassword);
    return this.prisma.student.create({
      include: {
        user: true,
      },
      data: {
        level: {
          connect: {
            id: levelId,
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
            password: hashedPassword,
            generatedPassword,
            role: Role.Student,
          },
        },
      },
    });
  }
  async addStudentCourse(inputs: AddStudentCourse) {
    const { courseId, studentId, price } = inputs;
    const studentPromise = this.prisma.student.findUnique({
      where: {
        id: studentId,
      },
    });
    const coursePromise = this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });
    const [student, course] = await Promise.all([
      studentPromise,
      coursePromise,
    ]);
    if (!student || course) {
      const field = !student ? 'Student' : 'Course';
      throw new BadRequestException(`${field} does not exist`);
    }
    return this.prisma.studentCourse.create({
      data: {
        studentId,
        courseId,
        price: price ? price : course.price,
      },
    });
  }
}
