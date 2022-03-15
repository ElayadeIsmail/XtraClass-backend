/*
  Warnings:

  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentCourse` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_gradeId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_levelId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_specializationId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "StudentCourse" DROP CONSTRAINT "StudentCourse_courseId_fkey";

-- DropForeignKey
ALTER TABLE "StudentCourse" DROP CONSTRAINT "StudentCourse_studentId_fkey";

-- DropForeignKey
ALTER TABLE "parents" DROP CONSTRAINT "parents_userId_fkey";

-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_gradeId_fkey";

-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_levelId_fkey";

-- DropTable
DROP TABLE "Course";

-- DropTable
DROP TABLE "StudentCourse";

-- CreateTable
CREATE TABLE "courses" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "gradeId" INTEGER NOT NULL,
    "levelId" INTEGER NOT NULL,
    "specializationId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_course" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "student_course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "instructors" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "instructors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "intructor_course" (
    "id" SERIAL NOT NULL,
    "instructorId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "intructor_course_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "student_course_studentId_courseId_key" ON "student_course"("studentId", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "instructors_userId_key" ON "instructors"("userId");

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "grades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parents" ADD CONSTRAINT "parents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "grades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_specializationId_fkey" FOREIGN KEY ("specializationId") REFERENCES "specializations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_course" ADD CONSTRAINT "student_course_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_course" ADD CONSTRAINT "student_course_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "instructors" ADD CONSTRAINT "instructors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "intructor_course" ADD CONSTRAINT "intructor_course_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "intructor_course" ADD CONSTRAINT "intructor_course_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "instructors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
