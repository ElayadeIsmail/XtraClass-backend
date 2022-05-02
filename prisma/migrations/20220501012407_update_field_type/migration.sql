/*
  Warnings:

  - The values [SUNDAY,MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY,SATURDAYS] on the enum `Days` will be removed. If these variants are still used in the database, this will fail.
  - Changed the type of `from` on the `calendars` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `to` on the `calendars` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Days_new" AS ENUM ('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thusrday', 'Friday', 'Saturday');
ALTER TABLE "calendars" ALTER COLUMN "day" TYPE "Days_new" USING ("day"::text::"Days_new");
ALTER TYPE "Days" RENAME TO "Days_old";
ALTER TYPE "Days_new" RENAME TO "Days";
DROP TYPE "Days_old";
COMMIT;

-- AlterTable
ALTER TABLE "calendars" DROP COLUMN "from",
ADD COLUMN     "from" DOUBLE PRECISION NOT NULL,
DROP COLUMN "to",
ADD COLUMN     "to" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "incomes_payments" ALTER COLUMN "date" SET DATA TYPE DATE,
ALTER COLUMN "payedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "outgoing_payments" ALTER COLUMN "date" SET DATA TYPE DATE,
ALTER COLUMN "payedAt" SET DEFAULT CURRENT_TIMESTAMP;
