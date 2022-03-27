import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateGroupInputs } from './dtos/create-group-inputs';
import { Group } from './Group';

@Injectable()
export class GroupsService {
  constructor(private readonly prisma: PrismaService) {}

  async createGroup(inputs: CreateGroupInputs): Promise<Group> {
    const { courseId, instructorId, name } = inputs;
    const groupNameAlreadyExistPromise = this.prisma.group.findUnique({
      where: {
        name,
      },
    });
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
    const [instructor, course, groupNameAlreadyExist] = await Promise.all([
      instructorPromise,
      coursePromise,
      groupNameAlreadyExistPromise,
    ]);
    if (!instructor || !course || groupNameAlreadyExist) {
      const ErrMsg = !instructor
        ? 'Instructor does not exist'
        : !course
        ? 'Course does not exist'
        : 'Group with this name already exist';
      throw new BadRequestException(ErrMsg);
    }
    return this.prisma.group.create({
      data: inputs,
    });
  }
  async findOne(id: number): Promise<Group> {
    const group = await this.prisma.group.findUnique({
      where: {
        id,
      },
      include: {
        _count: true,
        course: true,
        instructor: true,
        students: true,
      },
    });
    if (!group) {
      throw new NotFoundException();
    }
    return group;
  }
  find(): Promise<Group[]> {
    return this.prisma.group.findMany();
  }
  async delete(id: number): Promise<Group> {
    const group = await this.prisma.group.findUnique({
      where: {
        id,
      },
      include: {
        _count: true,
      },
    });
    if (!group) {
      throw new NotFoundException();
    }
    if (group._count.students > 0) {
      throw new BadRequestException(
        'Cannot delete this group because its still has students',
      );
    }
    return this.prisma.group.delete({
      where: {
        id,
      },
    });
  }
}
