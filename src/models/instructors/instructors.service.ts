import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { CreateInstructorInputs } from './dtos/create-instructor-inputs';
import { InstructorFilterInputs } from './dtos/instructor-filter-inputs';
import { Instructor } from './Instructor';

@Injectable()
export class InstructorsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UsersService,
  ) {}
  async createInstructor(inputs: CreateInstructorInputs): Promise<Instructor> {
    const userInputs = await this.userService.validateUserInputs(inputs);
    return this.prisma.instructor.create({
      include: {
        user: true,
      },
      data: {
        user: {
          create: {
            ...userInputs,
            role: Role.Instructor,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<Instructor> {
    const instructor = await this.prisma.instructor.findUnique({
      where: {
        id,
      },
      include: {
        _count: true,
        user: true,
        courses: {
          include: {
            course: true,
          },
        },
        groups: true,
      },
    });
    if (!instructor) {
      throw new NotFoundException();
    }
    return instructor;
  }
  async find(args: InstructorFilterInputs): Promise<Instructor[]> {
    const { limit, name, page } = args;
    const where: Prisma.InstructorWhereInput = {
      user: {
        username: {
          contains: name,
          mode: 'insensitive',
        },
      },
    };
    const skip = limit == -1 ? undefined : (page - 1) * limit;
    return this.prisma.instructor.findMany({
      where,
      include: {
        _count: true,
        user: true,
      },
      skip,
      take: limit == -1 ? undefined : limit,
    });
  }

  async delete(id: number): Promise<Instructor> {
    const instructor = await this.prisma.instructor.findUnique({
      where: {
        id,
      },
      include: {
        _count: true,
      },
    });
    if (!instructor) {
      throw new NotFoundException();
    }
    if (instructor._count.groups > 0) {
      throw new BadRequestException(
        'This Instructor still associated with groups',
      );
    }
    const deleteInstructorPromise = this.prisma.instructor.delete({
      where: {
        id,
      },
    });
    const deleteInstructorUserPromise = this.prisma.user.delete({
      where: {
        id: instructor.userId,
      },
    });
    await this.prisma.$transaction([
      deleteInstructorPromise,
      deleteInstructorUserPromise,
    ]);
    return instructor;
  }
}
