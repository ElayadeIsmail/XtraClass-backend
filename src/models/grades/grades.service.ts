import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateGradeInputs } from './dto/create-grade.inputs';
import { Grade } from './Grade';

@Injectable()
export class GradesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(inputs: CreateGradeInputs): Promise<Grade> {
    const { levels, name } = inputs;
    const nameAlreadyExist = await this.prisma.grade.findUnique({
      where: { name },
    });
    if (nameAlreadyExist) {
      throw new BadRequestException('Name already exist');
    }
    return this.prisma.grade.create({
      data: {
        name,
        levels: {
          createMany: {
            skipDuplicates: true,
            data: levels,
          },
        },
      },
    });
  }
  async findOne(id: number): Promise<Grade> {
    const grade = await this.prisma.grade.findUnique({
      where: {
        id,
      },
      include: {
        _count: {
          select: {
            courses: true,
            students: true,
          },
        },
        levels: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (!grade) {
      throw new NotFoundException();
    }
    return grade;
  }
  find(): Promise<Grade[]> {
    return this.prisma.grade.findMany({
      include: {
        _count: {
          select: {
            courses: true,
            students: true,
          },
        },
        levels: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
}
