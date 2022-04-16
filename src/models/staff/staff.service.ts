import { BadRequestException, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import slugify from 'slugify';
import { PasswordManager } from 'src/services/password.service';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { AddStaffInput } from './dto/add-staff-inputs';
import { Staff } from './Staff';

@Injectable()
export class StaffService {
  constructor(private readonly prisma: PrismaService) {}

  async create(inputs: AddStaffInput): Promise<Staff> {
    const { salary, ...userInput } = inputs;
    const username = slugify(userInput.firstName + ' ' + userInput.lastName);

    const nameAlreadyExistPromise = this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    const phoneAlreadyExistPromise = this.prisma.user.findUnique({
      where: {
        phone: userInput.phone,
      },
    });
    if (userInput.cin) {
      const cinAlreadyExist = await this.prisma.user.findUnique({
        where: {
          cin: userInput?.cin,
        },
      });
      if (cinAlreadyExist) {
        throw new BadRequestException('CIN already exist');
      }
    }
    const fullNameAlreadyExistPromise = this.prisma.user.findUnique({
      where: {
        fullName: {
          firstName: userInput.firstName,
          lastName: userInput.lastName,
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
    return this.prisma.staff.create({
      data: {
        salary,
        user: {
          create: {
            ...userInput,
            username,
            password: hashedPassword,
            generatedPassword,
            role: Role.Staff,
          },
        },
      },
    });
  }
}
