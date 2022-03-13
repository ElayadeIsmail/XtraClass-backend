-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_gradeId_fkey";

-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_levelId_fkey";

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "grades"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "levels"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
