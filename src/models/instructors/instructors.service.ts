import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import slugify from 'slugify';
import { PasswordManager } from 'src/services/password.service';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateInstructorInputs } from './dtos/create-instructor-inputs';
import { InstructorFilterInputs } from './dtos/instructor-filter-inputs';
import { Instructor } from './Instructor';

@Injectable()
export class InstructorsService {
  constructor(private readonly prisma: PrismaService) {}
  async createInstructor(inputs: CreateInstructorInputs): Promise<Instructor> {
    const username = slugify(inputs.firstName + ' ' + inputs.lastName);
    const nameAlreadyExistPromise = this.prisma.user.findUnique({
      where: {
        username,
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
            username,
            password: hashedPassword,
            generatedPassword,
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
