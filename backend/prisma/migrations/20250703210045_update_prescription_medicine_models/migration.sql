-- AddForeignKey
ALTER TABLE "Prescription_Medicine" ADD CONSTRAINT "Prescription_Medicine_prescription_id_fkey" FOREIGN KEY ("prescription_id") REFERENCES "Prescription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prescription_Medicine" ADD CONSTRAINT "Prescription_Medicine_medicine_id_fkey" FOREIGN KEY ("medicine_id") REFERENCES "Medicine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
