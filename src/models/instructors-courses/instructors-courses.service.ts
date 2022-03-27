import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { AddInstructorCourseInputs } from './dtos/add-instructor-course-input';

@Injectable()
export class InstructorsCoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async addInstructorToCourse(inputs: AddInstructorCourseInputs) {
    const { courseId, instructorId, percentage } = inputs;
    const coursePromise = this.prisma.course.findUnique({
      where: { id: courseId },
    });
    const instructorPromise = this.prisma.instructor.findUnique({
      where: {
        id: instructorId,
      },
    });
    const instructorCourseAlreadyExistPromise =
      this.prisma.instructorCourse.findUnique({
        where: {
          instructorId_courseId: {
            courseId,
            instructorId,
          },
        },
      });
    const [course, instructor, instructorCourse] = await Promise.all([
      coursePromise,
      instructorPromise,
      instructorCourseAlreadyExistPromise,
    ]);
    if (!course || !instructor) {
      const field = !course ? 'Course' : 'Instructor';
      throw new BadRequestException(`${field} does not exist`);
    }
    if (instructorCourse) {
      throw new BadRequestException('Instructor already has this course');
    }
    return this.prisma.instructorCourse.create({
      data: {
        percentage,
        courseId,
        instructorId,
      },
    });
  }

  async updateInstructorCoursePercentage({
    percentage,
    instructorCourseId,
  }: {
    percentage: number;
    instructorCourseId: number;
  }) {
    const instructorCourse = await this.prisma.instructorCourse.findUnique({
      where: {
        id: instructorCourseId,
      },
    });
    if (!instructorCourse) {
      throw new BadRequestException('Student course does not exist');
    }
    return this.prisma.instructorCourse.update({
      where: {
        id: instructorCourseId,
      },
      data: {
        percentage,
      },
    });
  }
  async removeInstructorFromCourse(instructorCourseId: number) {
    const instructorCourse = await this.prisma.instructorCourse.findUnique({
      where: { id: instructorCourseId },
    });
    if (!instructorCourse) {
      throw new NotFoundException();
    }
    const group = await this.prisma.group.findFirst({
      where: {
        instructorId: instructorCourse.instructorId,
      },
    });
    if (group) {
      throw new BadRequestException(
        'Cannot remove instructor course because this instructor still liked with a group for this course',
      );
    }
    return this.prisma.instructorCourse.delete({
      where: { id: instructorCourseId },
    });
  }
}
