/*
  Warnings:

  - The values [Thusrday] on the enum `Days` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Days_new" AS ENUM ('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
ALTER TABLE "calendars" ALTER COLUMN "day" TYPE "Days_new" USING ("day"::text::"Days_new");
ALTER TYPE "Days" RENAME TO "Days_old";
ALTER TYPE "Days_new" RENAME TO "Days";
DROP TYPE "Days_old";
COMMIT;
