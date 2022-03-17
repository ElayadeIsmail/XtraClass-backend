import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class StudentsCoursesService {
  constructor(private readonly prisma: PrismaService) {}
}
