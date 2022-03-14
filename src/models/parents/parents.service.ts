import { BadRequestException, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { generatePassword } from 'src/helpers/generate-password';
import { PasswordManager } from 'src/services/password.service';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateParentInput } from './dtos/create-parent.inputs';
import { Parent } from './Parent';

@Injectable()
export class ParentsService {
  constructor(private readonly prisma: PrismaService) {}
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
    const nameAlreadyExistPromise = this.prisma.user.findUnique({
      where: {
        username: userInput.username,
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

    const generatedPassword = generatePassword();
    const hashedPassword = await PasswordManager.hash(generatedPassword);
    return this.prisma.parent.create({
      data: {
        students: {
          connect: {
            id: studentId,
          },
        },
        user: {
          create: {
            ...userInput,
            password: hashedPassword,
            generatedPassword,
            role: Role.Parent,
          },
        },
      },
    });
  }
}
