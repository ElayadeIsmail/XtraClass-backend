/*
  Warnings:

  - A unique constraint covering the columns `[instructorId,courseId]` on the table `intructor_course` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "intructor_course_instructorId_courseId_key" ON "intructor_course"("instructorId", "courseId");
