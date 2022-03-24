import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class SpecializationsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(name: string) {
    const nameAlreadyExist = await this.prisma.specialization.findUnique({
      where: {
        name,
      },
    });
    if (nameAlreadyExist) {
      throw new BadRequestException('name already exist');
    }
    return this.prisma.specialization.create({
      data: {
        name,
      },
    });
  }

  async findOne(id: number) {
    const specialization = await this.prisma.specialization.findUnique({
      where: {
        id,
      },
    });
    if (!specialization) {
      throw new NotFoundException();
    }
    return specialization;
  }

  find() {
    return this.prisma.specialization.findMany();
  }

  async delete(id: number) {
    const specialization = await this.prisma.specialization.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            courses: true,
          },
        },
      },
    });
    if (!specialization) {
      throw new NotFoundException();
    }
    if (specialization._count.courses > 0) {
      throw new BadRequestException('this specializations still has courses');
    }
    return this.prisma.specialization.delete({
      where: { id },
    });
  }
}
