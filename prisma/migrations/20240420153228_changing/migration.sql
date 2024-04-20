/*
  Warnings:

  - The `necessita_aet` column on the `Risco` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Ergonomica" ALTER COLUMN "numero_trabalhadores_expostos" SET DATA TYPE STRING;

-- AlterTable
ALTER TABLE "Risco" DROP COLUMN "necessita_aet";
ALTER TABLE "Risco" ADD COLUMN     "necessita_aet" STRING;
