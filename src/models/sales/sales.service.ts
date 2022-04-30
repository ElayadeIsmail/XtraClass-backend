import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { Sale } from './Sale';

@Injectable()
export class SalesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(name: string): Promise<Sale> {
    const nameAlreadyExist = await this.prisma.sale.findUnique({
      where: {
        name,
      },
    });
    if (nameAlreadyExist) {
      throw new BadRequestException('Name Already Exist');
    }
    return this.prisma.sale.create({
      data: {
        name,
      },
    });
  }

  async update(id: number, name: string): Promise<Sale> {
    const sale = await this.prisma.sale.findUnique({
      where: {
        id,
      },
    });
    if (!sale) {
      throw new NotFoundException('Sale Not Found');
    }
    if (sale.name !== name) {
      const nameAlreadyExist = await this.prisma.sale.findUnique({
        where: {
          name,
        },
      });
      if (nameAlreadyExist) {
        throw new BadRequestException('Name Already Exist');
      }
    }
    return this.prisma.sale.update({
      where: {
        id,
      },
      data: { name },
    });
  }

  async findOne(id: number): Promise<Sale> {
    const sale = await this.prisma.sale.findUnique({
      where: {
        id,
      },
    });
    if (!sale) {
      throw new NotFoundException();
    }
    return sale;
  }

  find(): Promise<Sale[]> {
    return this.prisma.sale.findMany({});
  }

  async delete(id: number): Promise<Sale> {
    const sale = await this.prisma.sale.findUnique({
      where: {
        id,
      },
      include: {
        _count: true,
      },
    });
    if (!sale) {
      throw new NotFoundException();
    }
    if (sale._count.sessions > 0) {
      throw new BadRequestException(
        'Cannot delete sale with associate session',
      );
    }
    return this.prisma.sale.delete({
      where: { id },
    });
  }
}
