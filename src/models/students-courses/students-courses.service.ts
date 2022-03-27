import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { AddStudentToCourse } from './dtos/add-student-course';

@Injectable()
export class StudentsCoursesService {
  constructor(private readonly prisma: PrismaService) {}
  async addStudentToCourse(inputs: AddStudentToCourse) {
    const { courseId, studentId, groupId, price } = inputs;
    const studentPromise = this.prisma.student.findUnique({
      where: {
        id: studentId,
      },
      include: {
        groups: {
          where: {
            courseId: courseId,
          },
        },
      },
    });
    const coursePromise = this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        groups: {
          where: {
            id: groupId,
          },
        },
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
    if (student.groups.length !== 0) {
      throw new BadRequestException('Student already in group for this course');
    }
    if (course.groups.length === 0) {
      throw new BadRequestException(
        'this is no group connected with this course',
      );
    }
    if (student.levelId !== course.levelId) {
      throw new BadRequestException(
        'Student level and course level does not match',
      );
    }
    const createStudentCoursePromise = this.prisma.studentCourse.create({
      data: {
        studentId,
        courseId,
        price: price ? price : course.price,
      },
    });
    const updateStudentGroupsPromise = this.prisma.student.update({
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
    const [studentCourse] = await this.prisma.$transaction([
      createStudentCoursePromise,
      updateStudentGroupsPromise,
    ]);
    return studentCourse;
  }
  async updateStudentCourse(price: number, studentCourseId: number) {
    const studentCourse = await this.prisma.studentCourse.findUnique({
      where: {
        id: studentCourseId,
      },
    });
    if (!studentCourse) {
      throw new BadRequestException('Student course does not exist');
    }
    return this.prisma.studentCourse.update({
      where: {
        id: studentCourseId,
      },
      data: {
        price,
      },
    });
  }
  async removeStudentCourse(studentCourseId: number) {
    const studentCourse = await this.prisma.studentCourse.findUnique({
      where: { id: studentCourseId },
    });
    if (!studentCourse) {
      throw new NotFoundException();
    }
    const student = await this.prisma.student.findUnique({
      where: {
        id: studentCourse.studentId,
      },
      include: {
        groups: {
          where: {
            courseId: studentCourse.courseId,
          },
        },
      },
    });
    const groupId = student.groups[0].id;
    const removeStudentCoursePromise = this.prisma.studentCourse.delete({
      where: { id: studentCourseId },
    });
    const removeStudentFromGroupPromise = this.prisma.student.update({
      where: {
        id: studentCourse.studentId,
      },
      data: {
        groups: {
          disconnect: {
            id: groupId,
          },
        },
      },
    });
    await this.prisma.$transaction([
      removeStudentCoursePromise,
      removeStudentFromGroupPromise,
    ]);
    return studentCourse;
  }
}
