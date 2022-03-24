import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class SubjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(name: string) {
    const nameAlreadyExist = await this.prisma.subject.findUnique({
      where: {
        name,
      },
    });
    if (nameAlreadyExist) {
      throw new BadRequestException('name already exist');
    }
    return this.prisma.subject.create({
      data: {
        name,
      },
    });
  }

  async findOne(id: number) {
    const subject = await this.prisma.subject.findUnique({
      where: {
        id,
      },
    });
    if (!subject) {
      throw new NotFoundException();
    }
    return subject;
  }

  find() {
    return this.prisma.subject.findMany();
  }

  async remove(id: number) {
    const subject = await this.prisma.subject.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            courses: true,
          },
        },
      },
    });
    if (!subject) {
      throw new NotFoundException();
    }
    if (subject._count.courses > 0) {
      throw new BadRequestException('this subjects still has courses');
    }
    return this.prisma.subject.delete({
      where: { id },
    });
  }
}
