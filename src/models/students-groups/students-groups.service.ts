import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import {
  addStudentsToGroup,
  addStudentToGroup,
} from './dtos/add-student-group';
import {
  changeStudentGroup,
  changeStudentsGroup,
} from './dtos/change-student-group-input';

@Injectable()
export class StudentsGroupsService {
  constructor(private readonly prisma: PrismaService) {}

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
  async changeStudentGroup({
    newGroupId,
    oldGroupId,
    studentId,
  }: changeStudentGroup) {
    const studentPromise = this.prisma.student.findUnique({
      where: {
        id: studentId,
      },
      include: {
        groups: true,
        courses: true,
      },
    });
    const oldGroupPromise = this.prisma.group.findUnique({
      where: {
        id: oldGroupId,
      },
    });
    const newGroupPromise = this.prisma.group.findUnique({
      where: {
        id: newGroupId,
      },
    });
    const [student, oldGroup, newGroup] = await Promise.all([
      studentPromise,
      oldGroupPromise,
      newGroupPromise,
    ]);
    // ! Check if one of student or new group or old group does not exist
    if (!student || !oldGroup || !newGroup) {
      const field = !student
        ? 'Student'
        : !oldGroup
        ? 'Old Group'
        : 'New Group';
      throw new BadRequestException(`${field} does not exist`);
    }
    // ! Check if the user does not exist on old group
    const studentGroupsIds = student.groups.map((group) => group.id);
    const oldGroupIndex = studentGroupsIds.indexOf(oldGroupId);
    if (oldGroupIndex === -1) {
      throw new BadRequestException('Student does not exist in the old group');
    }
    // ! Check if the new group and the old group course match
    if (oldGroup.courseId !== newGroup.courseId) {
      throw new BadRequestException(
        'the old group and new group course must match',
      );
    }
    // ! update student course
    return this.prisma.student.update({
      where: {
        id: studentId,
      },
      data: {
        groups: {
          disconnect: {
            id: oldGroupId,
          },
          connect: {
            id: newGroupId,
          },
        },
      },
    });
  }
  async changeStudentsGroup({
    newGroupId,
    oldGroupId,
    studentsIds,
  }: changeStudentsGroup) {
    const studentsPromise = this.prisma.student.findMany({
      where: {
        id: {
          in: studentsIds,
        },
      },
      select: {
        id: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    const oldGroupPromise = this.prisma.group.findUnique({
      where: {
        id: oldGroupId,
      },
      select: {
        students: {
          where: {
            id: {
              in: studentsIds,
            },
          },
        },
      },
    });
    const newGroupPromise = this.prisma.group.findUnique({
      where: {
        id: newGroupId,
      },
    });
    const [students, oldGroup, newGroup] = await Promise.all([
      studentsPromise,
      oldGroupPromise,
      oldGroupPromise,
    ]);
  }
}
