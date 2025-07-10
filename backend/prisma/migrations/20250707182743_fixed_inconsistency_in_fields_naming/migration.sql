/*
  Warnings:

  - You are about to drop the column `day_of_week` on the `DoctorAvailability` table. All the data in the column will be lost.
  - You are about to drop the column `end_time` on the `DoctorAvailability` table. All the data in the column will be lost.
  - You are about to drop the column `start_time` on the `DoctorAvailability` table. All the data in the column will be lost.
  - Added the required column `dayOfWeek` to the `DoctorAvailability` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `DoctorAvailability` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `DoctorAvailability` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DoctorAvailability" DROP COLUMN "day_of_week",
DROP COLUMN "end_time",
DROP COLUMN "start_time",
ADD COLUMN     "dayOfWeek" TEXT NOT NULL,
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;
