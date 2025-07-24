-- CreateTable
CREATE TABLE "Symptom" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Symptom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SymptomHistory" (
    "id" SERIAL NOT NULL,
    "medicalHistoryId" INTEGER NOT NULL,
    "symptomId" INTEGER NOT NULL,

    CONSTRAINT "SymptomHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SymptomMedicineInteractions" (
    "id" SERIAL NOT NULL,
    "medicineId" INTEGER NOT NULL,
    "symptomId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "SymptomMedicineInteractions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SymptomHistory" ADD CONSTRAINT "SymptomHistory_medicalHistoryId_fkey" FOREIGN KEY ("medicalHistoryId") REFERENCES "MedicalHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SymptomHistory" ADD CONSTRAINT "SymptomHistory_symptomId_fkey" FOREIGN KEY ("symptomId") REFERENCES "Symptom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SymptomMedicineInteractions" ADD CONSTRAINT "SymptomMedicineInteractions_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "Medicine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SymptomMedicineInteractions" ADD CONSTRAINT "SymptomMedicineInteractions_symptomId_fkey" FOREIGN KEY ("symptomId") REFERENCES "Symptom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
