/*
  Warnings:

  - A unique constraint covering the columns `[name,gradeId]` on the table `levels` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "levels_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "levels_name_gradeId_key" ON "levels"("name", "gradeId");
