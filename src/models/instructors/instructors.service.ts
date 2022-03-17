import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { PasswordManager } from 'src/services/password.service';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { AddInstructorCourse } from './dtos/add-instructor-course-input';
import { CreateInstructorInputs } from './dtos/create-instructor-inputs';

@Injectable()
export class InstructorsService {
  constructor(private readonly prisma: PrismaService) {}
  async createInstructor(inputs: CreateInstructorInputs) {
    const nameAlreadyExistPromise = this.prisma.user.findUnique({
      where: {
        username: inputs.username,
      },
    });
    const phoneAlreadyExistPromise = this.prisma.user.findUnique({
      where: {
        phone: inputs.phone,
      },
    });
    if (inputs.cin) {
      const cinAlreadyExist = await this.prisma.user.findUnique({
        where: {
          cin: inputs?.cin,
        },
      });
      if (cinAlreadyExist) {
        throw new BadRequestException('CIN already exist');
      }
    }
    const fullNameAlreadyExistPromise = this.prisma.user.findUnique({
      where: {
        fullName: {
          firstName: inputs.firstName,
          lastName: inputs.lastName,
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

    const generatedPassword = PasswordManager.generatePassword();
    const hashedPassword = await PasswordManager.hash(generatedPassword);
    return this.prisma.instructor.create({
      include: {
        user: true,
      },
      data: {
        user: {
          create: {
            ...inputs,
            password: hashedPassword,
            generatedPassword,
            role: Role.Instructor,
          },
        },
      },
    });
  }

  async addInstructorToCourse(inputs: AddInstructorCourse) {
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
  async removeInstructorFromCourse({
    instructorCourseId,
  }: {
    instructorCourseId: number;
  }) {
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
