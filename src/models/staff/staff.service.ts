import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { CommonFindInputs } from 'src/common/inputs/common-find-inputs';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { AddStaffInput } from './dto/add-staff-inputs';
import { Staff } from './Staff';

@Injectable()
export class StaffService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UsersService,
  ) {}

  async create(inputs: AddStaffInput): Promise<Staff> {
    const { salary, ...userInput } = inputs;
    const validUserInputs = await this.userService.validateUserInputs(
      userInput,
    );

    return this.prisma.staff.create({
      data: {
        salary,
        user: {
          create: {
            ...validUserInputs,
            role: Role.Staff,
          },
        },
      },
    });
  }
  async findOne(id: number): Promise<Staff> {
    const staff = await this.prisma.staff.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });
    if (!staff) {
      throw new NotFoundException('Staff member not found');
    }
    return staff;
  }
  async find(args: CommonFindInputs): Promise<Staff[]> {
    const { limit, name, page } = args;
    const where: Prisma.StaffWhereInput = {
      user: {
        username: {
          contains: name,
          mode: 'insensitive',
        },
      },
    };

    const skip = limit == -1 ? undefined : (page - 1) * limit;
    const take = limit == -1 ? undefined : limit;
    return this.prisma.staff.findMany({
      where,
      skip,
      include: {
        user: true,
      },
      take,
    });
  }
  async delete(id: number): Promise<Staff> {
    const staff = await this.findOne(id);
    await this.prisma.$transaction([
      this.prisma.staff.delete({
        where: {
          id,
        },
      }),
      this.prisma.user.delete({
        where: {
          id: staff.userId,
        },
      }),
    ]);
    return staff;
  }
}
