import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { Course } from './Course';
import { CreateCourseInput } from './dto/create-course-inputs';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: number): Promise<Course> {
    const course = await this.prisma.course.findUnique({
      where: {
        id,
      },
      include: {
        _count: true,
        grade: true,
        level: true,
      },
    });
    if (!course) {
      throw new NotFoundException();
    }
    return course;
  }

  find(): Promise<Course[]> {
    return this.prisma.course.findMany({
      include: {
        grade: true,
        level: true,
      },
    });
  }

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
  async updateCoursePrice({
    courseId,
    price,
    updateForStudents,
  }: {
    courseId: number;
    price: number;
    updateForStudents: boolean;
  }) {
    if (price < 0) {
      throw new BadRequestException('Price must be positive number');
    }
    const course = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });
    if (!course) {
      throw new NotFoundException();
    }
    const requests: any[] = [
      this.prisma.course.update({
        where: {
          id: courseId,
        },
        data: {
          price,
        },
      }),
    ];
    if (updateForStudents) {
      requests.push(
        this.prisma.studentCourse.updateMany({
          where: {
            courseId,
          },
          data: {
            price,
          },
        }),
      );
    }
    await this.prisma.$transaction(requests);
    course.price = price;
    return course;
  }
}
