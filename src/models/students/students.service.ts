import { BadRequestException, Injectable } from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { generatePassword } from 'src/helpers/generate-password';
import { PasswordManager } from 'src/services/password.service';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateStudentInputs } from './dto/create-student.inputs';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  async createStudent(inputs: CreateStudentInputs): Promise<User> {
    const { username, cin, phone, firstName, lastName } = inputs;
    const nameAlreadyExistPromise = this.prisma.user.findUnique({
      where: {
        username,
      },
    });
    const phoneAlreadyExistPromise = this.prisma.user.findUnique({
      where: {
        cin,
      },
    });
    const cinAlreadyExistPromise = this.prisma.user.findUnique({
      where: {
        phone,
      },
    });
    const fullNameAlreadyExistPromise = this.prisma.user.findUnique({
      where: {
        fullName: {
          firstName,
          lastName,
        },
      },
    });
    // check if username of phone number in use
    const checksResult = await Promise.all([
      nameAlreadyExistPromise,
      phoneAlreadyExistPromise,
      cinAlreadyExistPromise,
      fullNameAlreadyExistPromise,
    ]);
    const fields = ['username', 'phone', 'cin', 'firstName and lastName'];
    checksResult.forEach((user, idx) => {
      if (!user && !(idx == 2 && !cin)) {
        throw new BadRequestException(`${fields[idx]} Already exist`);
      }
    });
    const generatedPassword = generatePassword();
    const hashedPassword = await PasswordManager.hash(generatedPassword);
    return this.prisma.user.create({
      include: {
        student: true,
      },
      data: {
        ...inputs,
        password: hashedPassword,
        generatedPassword,
        role: Role.Student,
        student: {
          create: {},
        },
      },
    });
  }
}
