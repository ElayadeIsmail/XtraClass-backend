import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateGroupInputs } from './dtos/create-group-inputs';

@Injectable()
export class GroupsService {
  constructor(private readonly prisma: PrismaService) {}

  async createGroup(inputs: CreateGroupInputs) {
    const { courseId, instructorId } = inputs;
    const instructorPromise = this.prisma.instructor.findUnique({
      where: {
        id: instructorId,
      },
    });
    const coursePromise = this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });
    const [instructor, course] = await Promise.all([
      instructorPromise,
      coursePromise,
    ]);
    if (!instructor || !course) {
      const field = !instructor ? 'Instructor' : 'Course';
      throw new BadRequestException(`${field} does not exist`);
    }
    return this.prisma.group.create({
      data: inputs,
    });
  }
}
