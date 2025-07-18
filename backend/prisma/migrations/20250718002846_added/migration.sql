/*
  Warnings:

  - A unique constraint covering the columns `[fdaId]` on the table `Medicine` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Medicine_fdaId_key" ON "Medicine"("fdaId");
