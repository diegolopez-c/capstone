-- DropIndex
DROP INDEX "Symptom_name_key";

-- CreateTable
CREATE TABLE "MedicineInteraction" (
    "id" SERIAL NOT NULL,
    "medicineAId" INTEGER NOT NULL,
    "medicineBId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MedicineInteraction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MedicineInteraction" ADD CONSTRAINT "MedicineInteraction_medicineAId_fkey" FOREIGN KEY ("medicineAId") REFERENCES "Medicine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicineInteraction" ADD CONSTRAINT "MedicineInteraction_medicineBId_fkey" FOREIGN KEY ("medicineBId") REFERENCES "Medicine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
