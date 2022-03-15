import { BadRequestException, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PasswordManager } from 'src/services/password.service';
import { PrismaService } from 'src/services/prisma/prisma.service';
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
}
