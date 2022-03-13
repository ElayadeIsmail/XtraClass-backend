import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateGradeInputs } from './dto/create-grade.inputs';
import { Grade } from './Grade';

@Injectable()
export class GradesService {
  constructor(private readonly prisma: PrismaService) {}

  async createGrade(inputs: CreateGradeInputs): Promise<Grade> {
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
}
