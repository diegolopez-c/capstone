/*
  Warnings:

  - You are about to drop the column `medicineList` on the `Prescription` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Prescription" DROP COLUMN "medicineList";

-- CreateTable
CREATE TABLE "Prescription_Medicine" (
    "id" SERIAL NOT NULL,
    "prescription_id" INTEGER NOT NULL,
    "medicine_id" INTEGER NOT NULL,
    "dosage" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "comments" TEXT,

    CONSTRAINT "Prescription_Medicine_pkey" PRIMARY KEY ("id")
);
