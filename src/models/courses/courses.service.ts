import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateCourseInput } from './dto/create-course-inputs';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async createCourse(inputs: CreateCourseInput) {
    const { gradeId, levelId, subjectId, specializationId } = inputs;
    const gradePromise = this.prisma.grade.findUnique({
      where: {
        id: gradeId,
      },
    });
    const levelPromise = this.prisma.level.findUnique({
      where: {
        id: levelId,
      },
    });
    const subjectPromise = this.prisma.subject.findUnique({
      where: {
        id: subjectId,
      },
    });
    const specializationsPromise = this.prisma.specialization.findUnique({
      where: {
        id: specializationId,
      },
    });
    const PromisesResult = await Promise.all([
      gradePromise,
      levelPromise,
      subjectPromise,
      specializationsPromise,
    ]);
    const fields = ['grade', 'level', 'subject', 'specialization'];
    PromisesResult.forEach((item, index) => {
      if (!item) {
        throw new BadRequestException(`${fields[index]} does not exist`);
      }
    });
    return this.prisma.course.create({
      data: inputs,
    });
  }
  async updateCourseName({
    courseId,
    name,
  }: {
    name: string;
    courseId: number;
  }) {
    const course = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });
    if (!course) {
      throw new NotFoundException();
    }
    return this.prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        name,
      },
    });
  }
}
