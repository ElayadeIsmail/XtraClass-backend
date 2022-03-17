import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { AddStudentToCourse } from './dtos/add-student-course';

@Injectable()
export class StudentsCoursesService {
  constructor(private readonly prisma: PrismaService) {}
  async addStudentToCourse(inputs: AddStudentToCourse) {
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
}
