import { BadRequestException, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { CreateParentInput } from './dtos/create-parent.inputs';
import { Parent } from './Parent';

@Injectable()
export class ParentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UsersService,
  ) {}
  async createParent(inputs: CreateParentInput): Promise<Parent> {
    const { studentId, ...userInput } = inputs;
    const student = await this.prisma.student.findUnique({
      where: {
        id: studentId,
      },
    });
    if (!student) {
      throw new BadRequestException('Student does not exist');
    }
    const validUserInputs = await this.userService.validateUserInputs(
      userInput,
    );
    return this.prisma.parent.create({
      data: {
        students: {
          connect: {
            id: studentId,
          },
        },
        user: {
          create: {
            ...validUserInputs,
            role: Role.Parent,
          },
        },
      },
    });
  }
}
