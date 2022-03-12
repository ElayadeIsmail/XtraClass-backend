import { PrismaClient } from '@prisma/client';
import { gradesData } from './data';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);
  //   add seed data
  for (const g of gradesData) {
    const grade = await prisma.grade.create({
      data: g,
    });
    console.log(`Created grade with id: ${grade.id}`);
  }
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
