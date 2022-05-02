/*
  Warnings:

  - You are about to drop the column `date` on the `incomes_payments` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `outgoing_payments` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[studentId,courseId,year,month]` on the table `incomes_payments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[instructorId,staffId,month,year]` on the table `outgoing_payments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `month` to the `incomes_payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `incomes_payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month` to the `outgoing_payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `outgoing_payments` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "incomes_payments_studentId_courseId_date_key";

-- DropIndex
DROP INDEX "outgoing_payments_instructorId_staffId_date_key";

-- AlterTable
ALTER TABLE "incomes_payments" DROP COLUMN "date",
ADD COLUMN     "month" SMALLINT NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "outgoing_payments" DROP COLUMN "date",
ADD COLUMN     "month" SMALLINT NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "incomes_payments_month_idx" ON "incomes_payments"("month");

-- CreateIndex
CREATE UNIQUE INDEX "incomes_payments_studentId_courseId_year_month_key" ON "incomes_payments"("studentId", "courseId", "year", "month");

-- CreateIndex
CREATE INDEX "outgoing_payments_month_idx" ON "outgoing_payments"("month");

-- CreateIndex
CREATE UNIQUE INDEX "outgoing_payments_instructorId_staffId_month_year_key" ON "outgoing_payments"("instructorId", "staffId", "month", "year");
