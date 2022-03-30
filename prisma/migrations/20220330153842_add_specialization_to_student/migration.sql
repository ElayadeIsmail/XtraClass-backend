-- DropForeignKey
ALTER TABLE "intructor_course" DROP CONSTRAINT "intructor_course_courseId_fkey";

-- DropForeignKey
ALTER TABLE "student_course" DROP CONSTRAINT "student_course_courseId_fkey";

-- AlterTable
ALTER TABLE "students" ADD COLUMN     "specializationId" INTEGER;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_specializationId_fkey" FOREIGN KEY ("specializationId") REFERENCES "specializations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_course" ADD CONSTRAINT "student_course_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "intructor_course" ADD CONSTRAINT "intructor_course_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
