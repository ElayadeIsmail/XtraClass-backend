import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma/prisma.service';
import { Level } from './Level';
@Injectable()
export class LevelsService {
  constructor(private readonly prisma: PrismaService) {}

  find(gradeId: number): Promise<Level[]> {
    return this.prisma.level.findMany({
      where: {
        gradeId,
      },
    });
  }
}
