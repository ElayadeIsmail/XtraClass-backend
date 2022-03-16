import { BadRequestException, Injectable } from '@nestjs/common';
import { Role, Student } from '@prisma/client';
import { PasswordManager } from 'src/services/password.service';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { AddStudentCourse } from './dto/add-student-course';
import { addStudentsToGroup, addStudentToGroup } from './dto/add-student-group';
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
    const generatedPassword = PasswordManager.generatePassword();
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
    if (!student || !course) {
      const field = !student ? 'Student' : 'Course';
      throw new BadRequestException(`${field} does not exist`);
    }
    if (student.levelId !== course.levelId) {
      throw new BadRequestException(
        'Student level and course level does not match',
      );
    }
    return this.prisma.studentCourse.create({
      data: {
        studentId,
        courseId,
        price: price ? price : course.price,
      },
    });
  }
  async addStudentToGroup({ groupId, studentId }: addStudentToGroup) {
    const group = await this.prisma.group.findUnique({
      where: { id: groupId },
    });
    if (!group) {
      throw new BadRequestException('Course Does Not Exist');
    }
    const student = await this.prisma.student.findUnique({
      where: {
        id: studentId,
      },
      include: {
        groups: {
          where: {
            courseId: group.courseId,
          },
        },
        courses: {
          where: {
            id: group.courseId,
          },
        },
      },
    });
    // ! check if student does not exist
    if (!student) {
      throw new BadRequestException('Student does not exist');
    }
    // ! check if student has access to this course
    if (student.courses.length === 0) {
      throw new BadRequestException(
        'Student does not have access to this course',
      );
    }
    // ! check if student already joined a group for this course
    if (student.groups.length > 0) {
      throw new BadRequestException(
        'Student already in a group for this course',
      );
    }
    return this.prisma.student.update({
      where: {
        id: studentId,
      },
      data: {
        groups: {
          connect: {
            id: groupId,
          },
        },
      },
    });
  }
  async addStudentsToGroup({ groupId, studentsIds }: addStudentsToGroup) {
    const group = await this.prisma.group.findUnique({
      where: { id: groupId },
    });
    if (!group) {
      throw new BadRequestException('Course Does Not Exist');
    }
    const students = await this.prisma.student.findMany({
      where: {
        id: { in: studentsIds },
        courses: {
          some: {
            id: group.courseId,
          },
        },
        groups: {
          none: {
            courseId: group.courseId,
          },
        },
      },
    });
    const existingIds = students.map((student) => student.id);
    if (students.length !== studentsIds.length) {
      // ! some student failed the check
      const invalidIds = studentsIds.filter((id) => !existingIds.includes(id));
      const student = await this.prisma.student.findUnique({
        where: {
          id: invalidIds[0],
        },
        select: {
          user: {
            select: { firstName: true, lastName: true },
          },
        },
      });
      if (!student) {
        throw new BadRequestException(
          `Student does not exist with id ${invalidIds[0]}`,
        );
      }
      // ! Consider changing message to be more specific
      throw new BadRequestException(
        `${student.user.firstName} ${student.user.firstName}
         does not have access the course
          of this group or already has access 
          to another group`,
      );
    }
    return this.prisma.group.update({
      where: {
        id: groupId,
      },
      data: {
        students: {
          connect: existingIds.map((id) => ({ id })),
        },
      },
    });
  }
}
