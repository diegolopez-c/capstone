/*
  Warnings:

  - You are about to drop the column `name` on the `Medicine` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Medicine" DROP COLUMN "name",
ADD COLUMN     "brandName" TEXT NOT NULL DEFAULT 'N/A',
ADD COLUMN     "fdaId" INTEGER,
ADD COLUMN     "genericName" TEXT NOT NULL DEFAULT 'N/A';
