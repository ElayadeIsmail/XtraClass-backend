-- CreateEnum
CREATE TYPE "Days" AS ENUM ('SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAYS');

-- CreateTable
CREATE TABLE "calendars" (
    "id" SERIAL NOT NULL,
    "groupId" INTEGER NOT NULL,
    "day" "Days" NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,

    CONSTRAINT "calendars_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "calendars" ADD CONSTRAINT "calendars_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
