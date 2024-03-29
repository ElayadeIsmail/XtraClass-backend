import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { Group } from '../groups/Group';

@Injectable()
export class InstructorsGroupsService {
  constructor(private readonly prisma: PrismaService) {}

  async changeGroupInstructor(
    instructorId: number,
    groupId: number,
  ): Promise<Group> {
    const group = await this.prisma.group.findUnique({
      where: {
        id: groupId,
      },
    });
    if (!group) {
      throw new NotFoundException('group not found');
    }
    const instructor = await this.prisma.instructor.findUnique({
      where: { id: instructorId },
      include: {
        courses: {
          where: {
            id: group.courseId,
          },
        },
      },
    });
    if (!instructor) {
      throw new NotFoundException('instructor not found');
    }
    if (instructor.courses.length === 0) {
      throw new BadRequestException(
        'Instructor does not have access to the course for this group',
      );
    }
    return this.prisma.group.update({
      where: { id: groupId },
      data: {
        instructorId,
      },
    });
  }
}
