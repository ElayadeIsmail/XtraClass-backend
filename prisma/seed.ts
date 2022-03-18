import { PrismaClient } from '@prisma/client';
import {
  coursesData,
  gradesData,
  specializationData,
  subjectsData,
} from './data';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);
  // add seed data
  for (const g of gradesData) {
    const grade = await prisma.grade.create({
      data: g,
    });
    console.log(`grade with id:${grade.id} was created`);
  }
  await Promise.all([
    prisma.specialization.createMany({
      data: specializationData,
    }),
    prisma.subject.createMany({
      data: subjectsData,
    }),
  ]);
  await prisma.course.createMany({
    data: coursesData,
  });
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
