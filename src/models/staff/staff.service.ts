import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
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
}
