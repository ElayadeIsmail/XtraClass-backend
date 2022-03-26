import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma/prisma.service';
@Injectable()
export class LevelsService {
  constructor(private readonly prisma: PrismaService) {}
}
