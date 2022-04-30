/*
  Warnings:

  - You are about to drop the column `sale` on the `calendars` table. All the data in the column will be lost.
  - Added the required column `saleId` to the `calendars` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "calendars" DROP COLUMN "sale",
ADD COLUMN     "saleId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Sale" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "outgoing_payments" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "instructorId" INTEGER,
    "staffId" INTEGER,
    "date" TIMESTAMP(3) NOT NULL,
    "payedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "outgoing_payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "incomes_payments" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "studentId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "payedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "incomes_payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payments" (
    "id" SERIAL NOT NULL,
    "incomesPaymentId" INTEGER,
    "outgoingPaymentId" INTEGER,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sale_name_key" ON "Sale"("name");

-- CreateIndex
CREATE UNIQUE INDEX "outgoing_payments_instructorId_staffId_date_key" ON "outgoing_payments"("instructorId", "staffId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "incomes_payments_studentId_courseId_date_key" ON "incomes_payments"("studentId", "courseId", "date");

-- AddForeignKey
ALTER TABLE "calendars" ADD CONSTRAINT "calendars_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outgoing_payments" ADD CONSTRAINT "outgoing_payments_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outgoing_payments" ADD CONSTRAINT "outgoing_payments_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "instructors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incomes_payments" ADD CONSTRAINT "incomes_payments_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incomes_payments" ADD CONSTRAINT "incomes_payments_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_outgoingPaymentId_fkey" FOREIGN KEY ("outgoingPaymentId") REFERENCES "outgoing_payments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_incomesPaymentId_fkey" FOREIGN KEY ("incomesPaymentId") REFERENCES "incomes_payments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
