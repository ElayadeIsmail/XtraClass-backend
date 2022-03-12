/*
  Warnings:

  - Added the required column `gradeId` to the `levels` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "levels" ADD COLUMN     "gradeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "levels" ADD CONSTRAINT "levels_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "grades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
