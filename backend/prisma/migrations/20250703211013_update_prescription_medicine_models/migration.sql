/*
  Warnings:

  - You are about to drop the column `medicine_id` on the `Prescription_Medicine` table. All the data in the column will be lost.
  - You are about to drop the column `prescription_id` on the `Prescription_Medicine` table. All the data in the column will be lost.
  - Added the required column `medicineId` to the `Prescription_Medicine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prescriptionId` to the `Prescription_Medicine` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Prescription_Medicine" DROP CONSTRAINT "Prescription_Medicine_medicine_id_fkey";

-- DropForeignKey
ALTER TABLE "Prescription_Medicine" DROP CONSTRAINT "Prescription_Medicine_prescription_id_fkey";

-- AlterTable
ALTER TABLE "Prescription_Medicine" DROP COLUMN "medicine_id",
DROP COLUMN "prescription_id",
ADD COLUMN     "medicineId" INTEGER NOT NULL,
ADD COLUMN     "prescriptionId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Prescription_Medicine" ADD CONSTRAINT "Prescription_Medicine_prescriptionId_fkey" FOREIGN KEY ("prescriptionId") REFERENCES "Prescription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prescription_Medicine" ADD CONSTRAINT "Prescription_Medicine_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "Medicine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
